import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SignUpCommand} from "../commands/signUp.command";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionEntity} from "../../common/entities/session.entity";
import {Repository} from "typeorm";
import {ClientProxy} from "@nestjs/microservices";
import {Inject} from "@nestjs/common";
import {AuthResponseDto} from "../../common/dto/authResponse.dto";
import {UserDto} from "../../common/dto/user.dto";
import {firstValueFrom} from "rxjs";
import bcrypt from "bcrypt";
import {randomBytes} from "node:crypto";
import {PinoLogger} from "nestjs-pino";
import {JwtService} from "@nestjs/jwt";

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(SessionEntity) private repository: Repository<SessionEntity>,
    @Inject("USERS_CLIENT") private usersClient: ClientProxy,
    @Inject("EVENTS_CLIENT") private eventsClient: ClientProxy,
    private readonly jwtService: JwtService,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: SignUpCommand): Promise<AuthResponseDto> {
    this.pino.info("SIGNING UP...")

    const {password} = command.dto;
    const passwordHash: string = await bcrypt.hash(password, 14);

    this.pino.info("CREATING USER ENTITY...")
    const user: UserDto = await firstValueFrom(this.usersClient.send("users.create", {
      ...command.dto,
      password: passwordHash
    }));

    this.pino.info("CREATING T0KENS...")
    const accessToken: string = await this.jwtService.signAsync({sub: user.userId});
    const refreshToken = randomBytes(32).toString();
    const refreshTokenHash: string = Buffer.from(refreshToken, "utf-8").toString("base64");

    this.pino.info("CREATING SESSION...");
    const session: SessionEntity = this.repository.create({
      userId: user.userId,
      refreshTokenHash,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
    });
    await this.repository.save(session);

    this.pino.info("USER SIGNED UP", user);
    this.eventsClient.emit("events.create", {domain: "AUTH", action: "SIGNED UP", payload: session});
    return {accessToken, refreshToken, sessionId: session.sessionId};
  }
}
