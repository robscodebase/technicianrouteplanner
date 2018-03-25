// package: technicianRoutePlanner
// file: technicianRoutePlanner.proto

import * as jspb from "google-protobuf";

export class RoutePlannerRequest extends jspb.Message {
  getRoutename(): string;
  setRoutename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoutePlannerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RoutePlannerRequest): RoutePlannerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoutePlannerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoutePlannerRequest;
  static deserializeBinaryFromReader(message: RoutePlannerRequest, reader: jspb.BinaryReader): RoutePlannerRequest;
}

export namespace RoutePlannerRequest {
  export type AsObject = {
    routename: string,
  }
}

export class RoutePlannerReply extends jspb.Message {
  clearCoordinatesList(): void;
  getCoordinatesList(): Array<number>;
  setCoordinatesList(value: Array<number>): void;
  addCoordinates(value: number, index?: number): number;

  getSizeofarray(): number;
  setSizeofarray(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoutePlannerReply.AsObject;
  static toObject(includeInstance: boolean, msg: RoutePlannerReply): RoutePlannerReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoutePlannerReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoutePlannerReply;
  static deserializeBinaryFromReader(message: RoutePlannerReply, reader: jspb.BinaryReader): RoutePlannerReply;
}

export namespace RoutePlannerReply {
  export type AsObject = {
    coordinatesList: Array<number>,
    sizeofarray: number,
  }
}

