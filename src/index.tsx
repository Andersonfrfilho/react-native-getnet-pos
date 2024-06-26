import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-getnet-pos' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const GetnetPos = NativeModules.GetnetPos
  ? NativeModules.GetnetPos
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function startingServices(): Promise<boolean> {
  return GetnetPos.startingServices();
}

interface CheckConnectionsResult {
  connection: boolean;
}
export function checkConnections(): Promise<CheckConnectionsResult> {
  return GetnetPos.checkConnections();
}

interface BeeperMethodResult {
  type: string;
  beeper: boolean;
}
export function beeperMethod(beeperMode: string): Promise<BeeperMethodResult> {
  return GetnetPos.beeperMethod({ beeperMode: beeperMode });
}

interface LedMethodResult {
  color: string;
  turn: boolean;
}
export function ledMethod(
  color: string,
  turn: boolean
): Promise<LedMethodResult> {
  return GetnetPos.ledMethod({ color: color, turn: turn });
}

interface CameraMethodResult {
  error: boolean;
  message: string;
}
export function cameraMethod(
  cameraType: string,
  timeout: number
): Promise<CameraMethodResult> {
  return GetnetPos.cameraMethod({ cameraType: cameraType, timeout: timeout });
}

interface CardStartConnectAntennaResult {
  error: boolean;
  message: string;
}
export function cardStartConnectAntenna(
  cardType: string,
  timeout: number
): Promise<CardStartConnectAntennaResult> {
  return GetnetPos.cardStartConnectAntenna({
    cardType: cardType,
    timeout: timeout,
  });
}

interface CardStopConnectAntennaResult {
  stop: boolean;
}
export function cardStopConnectAntenna(): Promise<CardStopConnectAntennaResult> {
  return GetnetPos.cardStopConnectAntenna();
}

interface PrintViewRequest {
  type: string;
  value: string;
  align: string;
}
interface PrintViewResult {
  stop: boolean;
}
export function printView(
  props: Array<PrintViewRequest>
): Promise<PrintViewResult> {
  return GetnetPos.printView(props);
}

interface PrintMethodRequest extends PrintViewRequest {
  weight: number;
}
interface PrintMethodResult {
  message: string;
  printer: boolean;
}
export function printMethod(
  props: Array<PrintMethodRequest>
): Promise<PrintMethodResult> {
  return GetnetPos.printMethod(props);
}
