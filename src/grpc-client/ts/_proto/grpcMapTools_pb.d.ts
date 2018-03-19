// package: grpcMapTools
// file: grpcMapTools.proto

import * as jspb from "google-protobuf";

export class Point extends jspb.Message {
  getLng(): number;
  setLng(value: number): void;

  getLat(): number;
  setLat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    lng: number,
    lat: number,
  }
}

export class PointInPolyRequest extends jspb.Message {
  hasPoint(): boolean;
  clearPoint(): void;
  getPoint(): Point | undefined;
  setPoint(value?: Point): void;

  clearPolyList(): void;
  getPolyList(): Array<Point>;
  setPolyList(value: Array<Point>): void;
  addPoly(value?: Point, index?: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PointInPolyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PointInPolyRequest): PointInPolyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PointInPolyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PointInPolyRequest;
  static deserializeBinaryFromReader(message: PointInPolyRequest, reader: jspb.BinaryReader): PointInPolyRequest;
}

export namespace PointInPolyRequest {
  export type AsObject = {
    point?: Point.AsObject,
    polyList: Array<Point.AsObject>,
  }
}

export class PointInPolyReply extends jspb.Message {
  getIspointinpoly(): boolean;
  setIspointinpoly(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PointInPolyReply.AsObject;
  static toObject(includeInstance: boolean, msg: PointInPolyReply): PointInPolyReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PointInPolyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PointInPolyReply;
  static deserializeBinaryFromReader(message: PointInPolyReply, reader: jspb.BinaryReader): PointInPolyReply;
}

export namespace PointInPolyReply {
  export type AsObject = {
    ispointinpoly: boolean,
  }
}

export class Answer extends jspb.Message {
  getAnswer(): number;
  setAnswer(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Answer.AsObject;
  static toObject(includeInstance: boolean, msg: Answer): Answer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Answer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Answer;
  static deserializeBinaryFromReader(message: Answer, reader: jspb.BinaryReader): Answer;
}

export namespace Answer {
  export type AsObject = {
    answer: number,
  }
}

export class AddRequest extends jspb.Message {
  getA(): number;
  setA(value: number): void;

  getB(): number;
  setB(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddRequest): AddRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddRequest;
  static deserializeBinaryFromReader(message: AddRequest, reader: jspb.BinaryReader): AddRequest;
}

export namespace AddRequest {
  export type AsObject = {
    a: number,
    b: number,
  }
}

