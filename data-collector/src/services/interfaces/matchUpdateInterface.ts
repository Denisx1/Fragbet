import { IFetchHandler } from "../../fetch/interfaces/fetchHandlerInterface";
import { IMatchRepository } from "../../repository/tierRepository/interfaces/matchRepositoryInterface";

export interface IMatchUpdateServiceDependencies{
    fetchService: IFetchHandler;
    matchRepository: IMatchRepository;
}