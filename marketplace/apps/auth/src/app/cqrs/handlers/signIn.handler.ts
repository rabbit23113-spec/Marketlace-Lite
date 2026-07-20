import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SignInCommand} from "../commands/signIn.command";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionEntity} from "../../common/entities/session.entity";
import {Repository} from "typeorm";
import {AuthResponseDto} from "../../common/dto/authResponse.dto";
import {Inject, UnauthorizedException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";
import {randomBytes} from "node:crypto";
import {firstValueFrom} from "rxjs";
import {UserDto} from "../../common/dto/user.dto";
import bcrypt from "bcrypt";
import {PinoLogger} from "nestjs-pino";

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectRepository(SessionEntity) private repository: Repository<SessionEntity>,
    @Inject("USERS_CLIENT") private readonly usersClient: ClientProxy,
    private readonly jwtService: JwtService,
    private pino: PinoLogger,
  ) {
  }

  async execute(command: SignInCommand): Promise<AuthResponseDto> {
    this.pino.info("SIGNING IN...")
    const {email, password} = command.dto;
    this.pino.info("CHECKING IF USER EXISTS...")
    const user: UserDto | null = await firstValueFrom(this.usersClient.send("users.findOneByEmail", {email}));
    if (!user) throw new UnauthorizedException();

    this.pino.info("CHECKING IF PASSWORD MATCH...")
    const isMatch: boolean = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException();

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

    this.pino.info("USER SIGNED IN", user);
    return {accessToken, refreshToken, sessionId: session.sessionId};
  }

}
