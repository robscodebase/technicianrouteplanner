// package: technicianRoutePlanner
// file: technicianRoutePlanner.proto

import * as jspb from "google-protobuf";

export class RoutePlannerRequest extends jspb.Message {
  hasRoutename(): boolean;
  clearRoutename(): void;
  getRoutename(): string | undefined;
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
    routename?: string,
  }
}

export class RoutePlannerReply extends jspb.Message {
  clearLinenumbersList(): void;
  getLinenumbersList(): Array<number>;
  setLinenumbersList(value: Array<number>): void;
  addLinenumbers(value: number, index?: number): number;

  hasSizeofarray(): boolean;
  clearSizeofarray(): void;
  getSizeofarray(): number | undefined;
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
    linenumbersList: Array<number>,
    sizeofarray?: number,
  }
}

