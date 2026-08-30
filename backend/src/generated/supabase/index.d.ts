
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Foreigner
 * 
 */
export type Foreigner = $Result.DefaultSelection<Prisma.$ForeignerPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Foreigners
 * const foreigners = await prisma.foreigner.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Foreigners
   * const foreigners = await prisma.foreigner.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.foreigner`: Exposes CRUD operations for the **Foreigner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Foreigners
    * const foreigners = await prisma.foreigner.findMany()
    * ```
    */
  get foreigner(): Prisma.ForeignerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Foreigner: 'Foreigner'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "foreigner"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Foreigner: {
        payload: Prisma.$ForeignerPayload<ExtArgs>
        fields: Prisma.ForeignerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForeignerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForeignerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>
          }
          findFirst: {
            args: Prisma.ForeignerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForeignerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>
          }
          findMany: {
            args: Prisma.ForeignerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>[]
          }
          create: {
            args: Prisma.ForeignerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>
          }
          createMany: {
            args: Prisma.ForeignerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForeignerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>[]
          }
          delete: {
            args: Prisma.ForeignerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>
          }
          update: {
            args: Prisma.ForeignerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>
          }
          deleteMany: {
            args: Prisma.ForeignerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForeignerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForeignerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>[]
          }
          upsert: {
            args: Prisma.ForeignerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForeignerPayload>
          }
          aggregate: {
            args: Prisma.ForeignerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForeigner>
          }
          groupBy: {
            args: Prisma.ForeignerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForeignerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForeignerCountArgs<ExtArgs>
            result: $Utils.Optional<ForeignerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    foreigner?: ForeignerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Foreigner
   */

  export type AggregateForeigner = {
    _count: ForeignerCountAggregateOutputType | null
    _avg: ForeignerAvgAggregateOutputType | null
    _sum: ForeignerSumAggregateOutputType | null
    _min: ForeignerMinAggregateOutputType | null
    _max: ForeignerMaxAggregateOutputType | null
  }

  export type ForeignerAvgAggregateOutputType = {
    sequenceNo: number | null
    year: number | null
    age: number | null
    amount: number | null
  }

  export type ForeignerSumAggregateOutputType = {
    sequenceNo: number | null
    year: number | null
    age: number | null
    amount: number | null
  }

  export type ForeignerMinAggregateOutputType = {
    id: string | null
    sequenceNo: number | null
    year: number | null
    foreignerIdNo: string | null
    prefix: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    age: number | null
    nationality: string | null
    ethnicity: string | null
    certificateRegistrationNo: string | null
    certificateDate: string | null
    district: string | null
    province: string | null
    policeStation: string | null
    policeProvince: string | null
    houseNo: string | null
    moo: string | null
    road: string | null
    subdistrict: string | null
    domicileDistrict: string | null
    domicileProvince: string | null
    domicile: string | null
    applicationType: string | null
    applicationDate: string | null
    expirationDate: string | null
    previousExpirationDate: string | null
    amount: number | null
    amountText: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    certificateNo: string | null
    petitionDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForeignerMaxAggregateOutputType = {
    id: string | null
    sequenceNo: number | null
    year: number | null
    foreignerIdNo: string | null
    prefix: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    age: number | null
    nationality: string | null
    ethnicity: string | null
    certificateRegistrationNo: string | null
    certificateDate: string | null
    district: string | null
    province: string | null
    policeStation: string | null
    policeProvince: string | null
    houseNo: string | null
    moo: string | null
    road: string | null
    subdistrict: string | null
    domicileDistrict: string | null
    domicileProvince: string | null
    domicile: string | null
    applicationType: string | null
    applicationDate: string | null
    expirationDate: string | null
    previousExpirationDate: string | null
    amount: number | null
    amountText: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    certificateNo: string | null
    petitionDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForeignerCountAggregateOutputType = {
    id: number
    sequenceNo: number
    year: number
    foreignerIdNo: number
    prefix: number
    firstName: number
    lastName: number
    fullName: number
    age: number
    nationality: number
    ethnicity: number
    certificateRegistrationNo: number
    certificateDate: number
    district: number
    province: number
    policeStation: number
    policeProvince: number
    houseNo: number
    moo: number
    road: number
    subdistrict: number
    domicileDistrict: number
    domicileProvince: number
    domicile: number
    applicationType: number
    applicationDate: number
    expirationDate: number
    previousExpirationDate: number
    amount: number
    amountText: number
    receiptBookNo: number
    receiptNo: number
    receiptDate: number
    certificateNo: number
    petitionDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ForeignerAvgAggregateInputType = {
    sequenceNo?: true
    year?: true
    age?: true
    amount?: true
  }

  export type ForeignerSumAggregateInputType = {
    sequenceNo?: true
    year?: true
    age?: true
    amount?: true
  }

  export type ForeignerMinAggregateInputType = {
    id?: true
    sequenceNo?: true
    year?: true
    foreignerIdNo?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    age?: true
    nationality?: true
    ethnicity?: true
    certificateRegistrationNo?: true
    certificateDate?: true
    district?: true
    province?: true
    policeStation?: true
    policeProvince?: true
    houseNo?: true
    moo?: true
    road?: true
    subdistrict?: true
    domicileDistrict?: true
    domicileProvince?: true
    domicile?: true
    applicationType?: true
    applicationDate?: true
    expirationDate?: true
    previousExpirationDate?: true
    amount?: true
    amountText?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    certificateNo?: true
    petitionDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForeignerMaxAggregateInputType = {
    id?: true
    sequenceNo?: true
    year?: true
    foreignerIdNo?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    age?: true
    nationality?: true
    ethnicity?: true
    certificateRegistrationNo?: true
    certificateDate?: true
    district?: true
    province?: true
    policeStation?: true
    policeProvince?: true
    houseNo?: true
    moo?: true
    road?: true
    subdistrict?: true
    domicileDistrict?: true
    domicileProvince?: true
    domicile?: true
    applicationType?: true
    applicationDate?: true
    expirationDate?: true
    previousExpirationDate?: true
    amount?: true
    amountText?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    certificateNo?: true
    petitionDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForeignerCountAggregateInputType = {
    id?: true
    sequenceNo?: true
    year?: true
    foreignerIdNo?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    age?: true
    nationality?: true
    ethnicity?: true
    certificateRegistrationNo?: true
    certificateDate?: true
    district?: true
    province?: true
    policeStation?: true
    policeProvince?: true
    houseNo?: true
    moo?: true
    road?: true
    subdistrict?: true
    domicileDistrict?: true
    domicileProvince?: true
    domicile?: true
    applicationType?: true
    applicationDate?: true
    expirationDate?: true
    previousExpirationDate?: true
    amount?: true
    amountText?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    certificateNo?: true
    petitionDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ForeignerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foreigner to aggregate.
     */
    where?: ForeignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foreigners to fetch.
     */
    orderBy?: ForeignerOrderByWithRelationInput | ForeignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForeignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foreigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foreigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Foreigners
    **/
    _count?: true | ForeignerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForeignerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForeignerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForeignerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForeignerMaxAggregateInputType
  }

  export type GetForeignerAggregateType<T extends ForeignerAggregateArgs> = {
        [P in keyof T & keyof AggregateForeigner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForeigner[P]>
      : GetScalarType<T[P], AggregateForeigner[P]>
  }




  export type ForeignerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForeignerWhereInput
    orderBy?: ForeignerOrderByWithAggregationInput | ForeignerOrderByWithAggregationInput[]
    by: ForeignerScalarFieldEnum[] | ForeignerScalarFieldEnum
    having?: ForeignerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForeignerCountAggregateInputType | true
    _avg?: ForeignerAvgAggregateInputType
    _sum?: ForeignerSumAggregateInputType
    _min?: ForeignerMinAggregateInputType
    _max?: ForeignerMaxAggregateInputType
  }

  export type ForeignerGroupByOutputType = {
    id: string
    sequenceNo: number | null
    year: number | null
    foreignerIdNo: string | null
    prefix: string | null
    firstName: string
    lastName: string
    fullName: string
    age: number | null
    nationality: string | null
    ethnicity: string | null
    certificateRegistrationNo: string | null
    certificateDate: string | null
    district: string | null
    province: string | null
    policeStation: string | null
    policeProvince: string | null
    houseNo: string | null
    moo: string | null
    road: string | null
    subdistrict: string | null
    domicileDistrict: string | null
    domicileProvince: string | null
    domicile: string | null
    applicationType: string | null
    applicationDate: string | null
    expirationDate: string | null
    previousExpirationDate: string | null
    amount: number | null
    amountText: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    certificateNo: string | null
    petitionDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ForeignerCountAggregateOutputType | null
    _avg: ForeignerAvgAggregateOutputType | null
    _sum: ForeignerSumAggregateOutputType | null
    _min: ForeignerMinAggregateOutputType | null
    _max: ForeignerMaxAggregateOutputType | null
  }

  type GetForeignerGroupByPayload<T extends ForeignerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForeignerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForeignerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForeignerGroupByOutputType[P]>
            : GetScalarType<T[P], ForeignerGroupByOutputType[P]>
        }
      >
    >


  export type ForeignerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceNo?: boolean
    year?: boolean
    foreignerIdNo?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    age?: boolean
    nationality?: boolean
    ethnicity?: boolean
    certificateRegistrationNo?: boolean
    certificateDate?: boolean
    district?: boolean
    province?: boolean
    policeStation?: boolean
    policeProvince?: boolean
    houseNo?: boolean
    moo?: boolean
    road?: boolean
    subdistrict?: boolean
    domicileDistrict?: boolean
    domicileProvince?: boolean
    domicile?: boolean
    applicationType?: boolean
    applicationDate?: boolean
    expirationDate?: boolean
    previousExpirationDate?: boolean
    amount?: boolean
    amountText?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    certificateNo?: boolean
    petitionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foreigner"]>

  export type ForeignerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceNo?: boolean
    year?: boolean
    foreignerIdNo?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    age?: boolean
    nationality?: boolean
    ethnicity?: boolean
    certificateRegistrationNo?: boolean
    certificateDate?: boolean
    district?: boolean
    province?: boolean
    policeStation?: boolean
    policeProvince?: boolean
    houseNo?: boolean
    moo?: boolean
    road?: boolean
    subdistrict?: boolean
    domicileDistrict?: boolean
    domicileProvince?: boolean
    domicile?: boolean
    applicationType?: boolean
    applicationDate?: boolean
    expirationDate?: boolean
    previousExpirationDate?: boolean
    amount?: boolean
    amountText?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    certificateNo?: boolean
    petitionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foreigner"]>

  export type ForeignerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceNo?: boolean
    year?: boolean
    foreignerIdNo?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    age?: boolean
    nationality?: boolean
    ethnicity?: boolean
    certificateRegistrationNo?: boolean
    certificateDate?: boolean
    district?: boolean
    province?: boolean
    policeStation?: boolean
    policeProvince?: boolean
    houseNo?: boolean
    moo?: boolean
    road?: boolean
    subdistrict?: boolean
    domicileDistrict?: boolean
    domicileProvince?: boolean
    domicile?: boolean
    applicationType?: boolean
    applicationDate?: boolean
    expirationDate?: boolean
    previousExpirationDate?: boolean
    amount?: boolean
    amountText?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    certificateNo?: boolean
    petitionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foreigner"]>

  export type ForeignerSelectScalar = {
    id?: boolean
    sequenceNo?: boolean
    year?: boolean
    foreignerIdNo?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    age?: boolean
    nationality?: boolean
    ethnicity?: boolean
    certificateRegistrationNo?: boolean
    certificateDate?: boolean
    district?: boolean
    province?: boolean
    policeStation?: boolean
    policeProvince?: boolean
    houseNo?: boolean
    moo?: boolean
    road?: boolean
    subdistrict?: boolean
    domicileDistrict?: boolean
    domicileProvince?: boolean
    domicile?: boolean
    applicationType?: boolean
    applicationDate?: boolean
    expirationDate?: boolean
    previousExpirationDate?: boolean
    amount?: boolean
    amountText?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    certificateNo?: boolean
    petitionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ForeignerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sequenceNo" | "year" | "foreignerIdNo" | "prefix" | "firstName" | "lastName" | "fullName" | "age" | "nationality" | "ethnicity" | "certificateRegistrationNo" | "certificateDate" | "district" | "province" | "policeStation" | "policeProvince" | "houseNo" | "moo" | "road" | "subdistrict" | "domicileDistrict" | "domicileProvince" | "domicile" | "applicationType" | "applicationDate" | "expirationDate" | "previousExpirationDate" | "amount" | "amountText" | "receiptBookNo" | "receiptNo" | "receiptDate" | "certificateNo" | "petitionDate" | "createdAt" | "updatedAt", ExtArgs["result"]["foreigner"]>

  export type $ForeignerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Foreigner"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sequenceNo: number | null
      year: number | null
      foreignerIdNo: string | null
      prefix: string | null
      firstName: string
      lastName: string
      fullName: string
      age: number | null
      nationality: string | null
      ethnicity: string | null
      certificateRegistrationNo: string | null
      certificateDate: string | null
      district: string | null
      province: string | null
      policeStation: string | null
      policeProvince: string | null
      houseNo: string | null
      moo: string | null
      road: string | null
      subdistrict: string | null
      domicileDistrict: string | null
      domicileProvince: string | null
      domicile: string | null
      applicationType: string | null
      applicationDate: string | null
      expirationDate: string | null
      previousExpirationDate: string | null
      amount: number | null
      amountText: string | null
      receiptBookNo: string | null
      receiptNo: string | null
      receiptDate: string | null
      certificateNo: string | null
      petitionDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foreigner"]>
    composites: {}
  }

  type ForeignerGetPayload<S extends boolean | null | undefined | ForeignerDefaultArgs> = $Result.GetResult<Prisma.$ForeignerPayload, S>

  type ForeignerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForeignerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForeignerCountAggregateInputType | true
    }

  export interface ForeignerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Foreigner'], meta: { name: 'Foreigner' } }
    /**
     * Find zero or one Foreigner that matches the filter.
     * @param {ForeignerFindUniqueArgs} args - Arguments to find a Foreigner
     * @example
     * // Get one Foreigner
     * const foreigner = await prisma.foreigner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForeignerFindUniqueArgs>(args: SelectSubset<T, ForeignerFindUniqueArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Foreigner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForeignerFindUniqueOrThrowArgs} args - Arguments to find a Foreigner
     * @example
     * // Get one Foreigner
     * const foreigner = await prisma.foreigner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForeignerFindUniqueOrThrowArgs>(args: SelectSubset<T, ForeignerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Foreigner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerFindFirstArgs} args - Arguments to find a Foreigner
     * @example
     * // Get one Foreigner
     * const foreigner = await prisma.foreigner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForeignerFindFirstArgs>(args?: SelectSubset<T, ForeignerFindFirstArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Foreigner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerFindFirstOrThrowArgs} args - Arguments to find a Foreigner
     * @example
     * // Get one Foreigner
     * const foreigner = await prisma.foreigner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForeignerFindFirstOrThrowArgs>(args?: SelectSubset<T, ForeignerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Foreigners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Foreigners
     * const foreigners = await prisma.foreigner.findMany()
     * 
     * // Get first 10 Foreigners
     * const foreigners = await prisma.foreigner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foreignerWithIdOnly = await prisma.foreigner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForeignerFindManyArgs>(args?: SelectSubset<T, ForeignerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Foreigner.
     * @param {ForeignerCreateArgs} args - Arguments to create a Foreigner.
     * @example
     * // Create one Foreigner
     * const Foreigner = await prisma.foreigner.create({
     *   data: {
     *     // ... data to create a Foreigner
     *   }
     * })
     * 
     */
    create<T extends ForeignerCreateArgs>(args: SelectSubset<T, ForeignerCreateArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Foreigners.
     * @param {ForeignerCreateManyArgs} args - Arguments to create many Foreigners.
     * @example
     * // Create many Foreigners
     * const foreigner = await prisma.foreigner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForeignerCreateManyArgs>(args?: SelectSubset<T, ForeignerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Foreigners and returns the data saved in the database.
     * @param {ForeignerCreateManyAndReturnArgs} args - Arguments to create many Foreigners.
     * @example
     * // Create many Foreigners
     * const foreigner = await prisma.foreigner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Foreigners and only return the `id`
     * const foreignerWithIdOnly = await prisma.foreigner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForeignerCreateManyAndReturnArgs>(args?: SelectSubset<T, ForeignerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Foreigner.
     * @param {ForeignerDeleteArgs} args - Arguments to delete one Foreigner.
     * @example
     * // Delete one Foreigner
     * const Foreigner = await prisma.foreigner.delete({
     *   where: {
     *     // ... filter to delete one Foreigner
     *   }
     * })
     * 
     */
    delete<T extends ForeignerDeleteArgs>(args: SelectSubset<T, ForeignerDeleteArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Foreigner.
     * @param {ForeignerUpdateArgs} args - Arguments to update one Foreigner.
     * @example
     * // Update one Foreigner
     * const foreigner = await prisma.foreigner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForeignerUpdateArgs>(args: SelectSubset<T, ForeignerUpdateArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Foreigners.
     * @param {ForeignerDeleteManyArgs} args - Arguments to filter Foreigners to delete.
     * @example
     * // Delete a few Foreigners
     * const { count } = await prisma.foreigner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForeignerDeleteManyArgs>(args?: SelectSubset<T, ForeignerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foreigners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Foreigners
     * const foreigner = await prisma.foreigner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForeignerUpdateManyArgs>(args: SelectSubset<T, ForeignerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foreigners and returns the data updated in the database.
     * @param {ForeignerUpdateManyAndReturnArgs} args - Arguments to update many Foreigners.
     * @example
     * // Update many Foreigners
     * const foreigner = await prisma.foreigner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Foreigners and only return the `id`
     * const foreignerWithIdOnly = await prisma.foreigner.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ForeignerUpdateManyAndReturnArgs>(args: SelectSubset<T, ForeignerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Foreigner.
     * @param {ForeignerUpsertArgs} args - Arguments to update or create a Foreigner.
     * @example
     * // Update or create a Foreigner
     * const foreigner = await prisma.foreigner.upsert({
     *   create: {
     *     // ... data to create a Foreigner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Foreigner we want to update
     *   }
     * })
     */
    upsert<T extends ForeignerUpsertArgs>(args: SelectSubset<T, ForeignerUpsertArgs<ExtArgs>>): Prisma__ForeignerClient<$Result.GetResult<Prisma.$ForeignerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Foreigners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerCountArgs} args - Arguments to filter Foreigners to count.
     * @example
     * // Count the number of Foreigners
     * const count = await prisma.foreigner.count({
     *   where: {
     *     // ... the filter for the Foreigners we want to count
     *   }
     * })
    **/
    count<T extends ForeignerCountArgs>(
      args?: Subset<T, ForeignerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForeignerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Foreigner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForeignerAggregateArgs>(args: Subset<T, ForeignerAggregateArgs>): Prisma.PrismaPromise<GetForeignerAggregateType<T>>

    /**
     * Group by Foreigner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForeignerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForeignerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForeignerGroupByArgs['orderBy'] }
        : { orderBy?: ForeignerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForeignerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForeignerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Foreigner model
   */
  readonly fields: ForeignerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Foreigner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForeignerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Foreigner model
   */
  interface ForeignerFieldRefs {
    readonly id: FieldRef<"Foreigner", 'String'>
    readonly sequenceNo: FieldRef<"Foreigner", 'Int'>
    readonly year: FieldRef<"Foreigner", 'Int'>
    readonly foreignerIdNo: FieldRef<"Foreigner", 'String'>
    readonly prefix: FieldRef<"Foreigner", 'String'>
    readonly firstName: FieldRef<"Foreigner", 'String'>
    readonly lastName: FieldRef<"Foreigner", 'String'>
    readonly fullName: FieldRef<"Foreigner", 'String'>
    readonly age: FieldRef<"Foreigner", 'Int'>
    readonly nationality: FieldRef<"Foreigner", 'String'>
    readonly ethnicity: FieldRef<"Foreigner", 'String'>
    readonly certificateRegistrationNo: FieldRef<"Foreigner", 'String'>
    readonly certificateDate: FieldRef<"Foreigner", 'String'>
    readonly district: FieldRef<"Foreigner", 'String'>
    readonly province: FieldRef<"Foreigner", 'String'>
    readonly policeStation: FieldRef<"Foreigner", 'String'>
    readonly policeProvince: FieldRef<"Foreigner", 'String'>
    readonly houseNo: FieldRef<"Foreigner", 'String'>
    readonly moo: FieldRef<"Foreigner", 'String'>
    readonly road: FieldRef<"Foreigner", 'String'>
    readonly subdistrict: FieldRef<"Foreigner", 'String'>
    readonly domicileDistrict: FieldRef<"Foreigner", 'String'>
    readonly domicileProvince: FieldRef<"Foreigner", 'String'>
    readonly domicile: FieldRef<"Foreigner", 'String'>
    readonly applicationType: FieldRef<"Foreigner", 'String'>
    readonly applicationDate: FieldRef<"Foreigner", 'String'>
    readonly expirationDate: FieldRef<"Foreigner", 'String'>
    readonly previousExpirationDate: FieldRef<"Foreigner", 'String'>
    readonly amount: FieldRef<"Foreigner", 'Int'>
    readonly amountText: FieldRef<"Foreigner", 'String'>
    readonly receiptBookNo: FieldRef<"Foreigner", 'String'>
    readonly receiptNo: FieldRef<"Foreigner", 'String'>
    readonly receiptDate: FieldRef<"Foreigner", 'String'>
    readonly certificateNo: FieldRef<"Foreigner", 'String'>
    readonly petitionDate: FieldRef<"Foreigner", 'DateTime'>
    readonly createdAt: FieldRef<"Foreigner", 'DateTime'>
    readonly updatedAt: FieldRef<"Foreigner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Foreigner findUnique
   */
  export type ForeignerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * Filter, which Foreigner to fetch.
     */
    where: ForeignerWhereUniqueInput
  }

  /**
   * Foreigner findUniqueOrThrow
   */
  export type ForeignerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * Filter, which Foreigner to fetch.
     */
    where: ForeignerWhereUniqueInput
  }

  /**
   * Foreigner findFirst
   */
  export type ForeignerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * Filter, which Foreigner to fetch.
     */
    where?: ForeignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foreigners to fetch.
     */
    orderBy?: ForeignerOrderByWithRelationInput | ForeignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foreigners.
     */
    cursor?: ForeignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foreigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foreigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foreigners.
     */
    distinct?: ForeignerScalarFieldEnum | ForeignerScalarFieldEnum[]
  }

  /**
   * Foreigner findFirstOrThrow
   */
  export type ForeignerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * Filter, which Foreigner to fetch.
     */
    where?: ForeignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foreigners to fetch.
     */
    orderBy?: ForeignerOrderByWithRelationInput | ForeignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foreigners.
     */
    cursor?: ForeignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foreigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foreigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foreigners.
     */
    distinct?: ForeignerScalarFieldEnum | ForeignerScalarFieldEnum[]
  }

  /**
   * Foreigner findMany
   */
  export type ForeignerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * Filter, which Foreigners to fetch.
     */
    where?: ForeignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foreigners to fetch.
     */
    orderBy?: ForeignerOrderByWithRelationInput | ForeignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Foreigners.
     */
    cursor?: ForeignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foreigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foreigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foreigners.
     */
    distinct?: ForeignerScalarFieldEnum | ForeignerScalarFieldEnum[]
  }

  /**
   * Foreigner create
   */
  export type ForeignerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * The data needed to create a Foreigner.
     */
    data: XOR<ForeignerCreateInput, ForeignerUncheckedCreateInput>
  }

  /**
   * Foreigner createMany
   */
  export type ForeignerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Foreigners.
     */
    data: ForeignerCreateManyInput | ForeignerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Foreigner createManyAndReturn
   */
  export type ForeignerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * The data used to create many Foreigners.
     */
    data: ForeignerCreateManyInput | ForeignerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Foreigner update
   */
  export type ForeignerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * The data needed to update a Foreigner.
     */
    data: XOR<ForeignerUpdateInput, ForeignerUncheckedUpdateInput>
    /**
     * Choose, which Foreigner to update.
     */
    where: ForeignerWhereUniqueInput
  }

  /**
   * Foreigner updateMany
   */
  export type ForeignerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Foreigners.
     */
    data: XOR<ForeignerUpdateManyMutationInput, ForeignerUncheckedUpdateManyInput>
    /**
     * Filter which Foreigners to update
     */
    where?: ForeignerWhereInput
    /**
     * Limit how many Foreigners to update.
     */
    limit?: number
  }

  /**
   * Foreigner updateManyAndReturn
   */
  export type ForeignerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * The data used to update Foreigners.
     */
    data: XOR<ForeignerUpdateManyMutationInput, ForeignerUncheckedUpdateManyInput>
    /**
     * Filter which Foreigners to update
     */
    where?: ForeignerWhereInput
    /**
     * Limit how many Foreigners to update.
     */
    limit?: number
  }

  /**
   * Foreigner upsert
   */
  export type ForeignerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * The filter to search for the Foreigner to update in case it exists.
     */
    where: ForeignerWhereUniqueInput
    /**
     * In case the Foreigner found by the `where` argument doesn't exist, create a new Foreigner with this data.
     */
    create: XOR<ForeignerCreateInput, ForeignerUncheckedCreateInput>
    /**
     * In case the Foreigner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForeignerUpdateInput, ForeignerUncheckedUpdateInput>
  }

  /**
   * Foreigner delete
   */
  export type ForeignerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
    /**
     * Filter which Foreigner to delete.
     */
    where: ForeignerWhereUniqueInput
  }

  /**
   * Foreigner deleteMany
   */
  export type ForeignerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foreigners to delete
     */
    where?: ForeignerWhereInput
    /**
     * Limit how many Foreigners to delete.
     */
    limit?: number
  }

  /**
   * Foreigner without action
   */
  export type ForeignerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foreigner
     */
    select?: ForeignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foreigner
     */
    omit?: ForeignerOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ForeignerScalarFieldEnum: {
    id: 'id',
    sequenceNo: 'sequenceNo',
    year: 'year',
    foreignerIdNo: 'foreignerIdNo',
    prefix: 'prefix',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    age: 'age',
    nationality: 'nationality',
    ethnicity: 'ethnicity',
    certificateRegistrationNo: 'certificateRegistrationNo',
    certificateDate: 'certificateDate',
    district: 'district',
    province: 'province',
    policeStation: 'policeStation',
    policeProvince: 'policeProvince',
    houseNo: 'houseNo',
    moo: 'moo',
    road: 'road',
    subdistrict: 'subdistrict',
    domicileDistrict: 'domicileDistrict',
    domicileProvince: 'domicileProvince',
    domicile: 'domicile',
    applicationType: 'applicationType',
    applicationDate: 'applicationDate',
    expirationDate: 'expirationDate',
    previousExpirationDate: 'previousExpirationDate',
    amount: 'amount',
    amountText: 'amountText',
    receiptBookNo: 'receiptBookNo',
    receiptNo: 'receiptNo',
    receiptDate: 'receiptDate',
    certificateNo: 'certificateNo',
    petitionDate: 'petitionDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ForeignerScalarFieldEnum = (typeof ForeignerScalarFieldEnum)[keyof typeof ForeignerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ForeignerWhereInput = {
    AND?: ForeignerWhereInput | ForeignerWhereInput[]
    OR?: ForeignerWhereInput[]
    NOT?: ForeignerWhereInput | ForeignerWhereInput[]
    id?: StringFilter<"Foreigner"> | string
    sequenceNo?: IntNullableFilter<"Foreigner"> | number | null
    year?: IntNullableFilter<"Foreigner"> | number | null
    foreignerIdNo?: StringNullableFilter<"Foreigner"> | string | null
    prefix?: StringNullableFilter<"Foreigner"> | string | null
    firstName?: StringFilter<"Foreigner"> | string
    lastName?: StringFilter<"Foreigner"> | string
    fullName?: StringFilter<"Foreigner"> | string
    age?: IntNullableFilter<"Foreigner"> | number | null
    nationality?: StringNullableFilter<"Foreigner"> | string | null
    ethnicity?: StringNullableFilter<"Foreigner"> | string | null
    certificateRegistrationNo?: StringNullableFilter<"Foreigner"> | string | null
    certificateDate?: StringNullableFilter<"Foreigner"> | string | null
    district?: StringNullableFilter<"Foreigner"> | string | null
    province?: StringNullableFilter<"Foreigner"> | string | null
    policeStation?: StringNullableFilter<"Foreigner"> | string | null
    policeProvince?: StringNullableFilter<"Foreigner"> | string | null
    houseNo?: StringNullableFilter<"Foreigner"> | string | null
    moo?: StringNullableFilter<"Foreigner"> | string | null
    road?: StringNullableFilter<"Foreigner"> | string | null
    subdistrict?: StringNullableFilter<"Foreigner"> | string | null
    domicileDistrict?: StringNullableFilter<"Foreigner"> | string | null
    domicileProvince?: StringNullableFilter<"Foreigner"> | string | null
    domicile?: StringNullableFilter<"Foreigner"> | string | null
    applicationType?: StringNullableFilter<"Foreigner"> | string | null
    applicationDate?: StringNullableFilter<"Foreigner"> | string | null
    expirationDate?: StringNullableFilter<"Foreigner"> | string | null
    previousExpirationDate?: StringNullableFilter<"Foreigner"> | string | null
    amount?: IntNullableFilter<"Foreigner"> | number | null
    amountText?: StringNullableFilter<"Foreigner"> | string | null
    receiptBookNo?: StringNullableFilter<"Foreigner"> | string | null
    receiptNo?: StringNullableFilter<"Foreigner"> | string | null
    receiptDate?: StringNullableFilter<"Foreigner"> | string | null
    certificateNo?: StringNullableFilter<"Foreigner"> | string | null
    petitionDate?: DateTimeNullableFilter<"Foreigner"> | Date | string | null
    createdAt?: DateTimeFilter<"Foreigner"> | Date | string
    updatedAt?: DateTimeFilter<"Foreigner"> | Date | string
  }

  export type ForeignerOrderByWithRelationInput = {
    id?: SortOrder
    sequenceNo?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    foreignerIdNo?: SortOrderInput | SortOrder
    prefix?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    age?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    ethnicity?: SortOrderInput | SortOrder
    certificateRegistrationNo?: SortOrderInput | SortOrder
    certificateDate?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    policeStation?: SortOrderInput | SortOrder
    policeProvince?: SortOrderInput | SortOrder
    houseNo?: SortOrderInput | SortOrder
    moo?: SortOrderInput | SortOrder
    road?: SortOrderInput | SortOrder
    subdistrict?: SortOrderInput | SortOrder
    domicileDistrict?: SortOrderInput | SortOrder
    domicileProvince?: SortOrderInput | SortOrder
    domicile?: SortOrderInput | SortOrder
    applicationType?: SortOrderInput | SortOrder
    applicationDate?: SortOrderInput | SortOrder
    expirationDate?: SortOrderInput | SortOrder
    previousExpirationDate?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    amountText?: SortOrderInput | SortOrder
    receiptBookNo?: SortOrderInput | SortOrder
    receiptNo?: SortOrderInput | SortOrder
    receiptDate?: SortOrderInput | SortOrder
    certificateNo?: SortOrderInput | SortOrder
    petitionDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ForeignerWhereInput | ForeignerWhereInput[]
    OR?: ForeignerWhereInput[]
    NOT?: ForeignerWhereInput | ForeignerWhereInput[]
    sequenceNo?: IntNullableFilter<"Foreigner"> | number | null
    year?: IntNullableFilter<"Foreigner"> | number | null
    foreignerIdNo?: StringNullableFilter<"Foreigner"> | string | null
    prefix?: StringNullableFilter<"Foreigner"> | string | null
    firstName?: StringFilter<"Foreigner"> | string
    lastName?: StringFilter<"Foreigner"> | string
    fullName?: StringFilter<"Foreigner"> | string
    age?: IntNullableFilter<"Foreigner"> | number | null
    nationality?: StringNullableFilter<"Foreigner"> | string | null
    ethnicity?: StringNullableFilter<"Foreigner"> | string | null
    certificateRegistrationNo?: StringNullableFilter<"Foreigner"> | string | null
    certificateDate?: StringNullableFilter<"Foreigner"> | string | null
    district?: StringNullableFilter<"Foreigner"> | string | null
    province?: StringNullableFilter<"Foreigner"> | string | null
    policeStation?: StringNullableFilter<"Foreigner"> | string | null
    policeProvince?: StringNullableFilter<"Foreigner"> | string | null
    houseNo?: StringNullableFilter<"Foreigner"> | string | null
    moo?: StringNullableFilter<"Foreigner"> | string | null
    road?: StringNullableFilter<"Foreigner"> | string | null
    subdistrict?: StringNullableFilter<"Foreigner"> | string | null
    domicileDistrict?: StringNullableFilter<"Foreigner"> | string | null
    domicileProvince?: StringNullableFilter<"Foreigner"> | string | null
    domicile?: StringNullableFilter<"Foreigner"> | string | null
    applicationType?: StringNullableFilter<"Foreigner"> | string | null
    applicationDate?: StringNullableFilter<"Foreigner"> | string | null
    expirationDate?: StringNullableFilter<"Foreigner"> | string | null
    previousExpirationDate?: StringNullableFilter<"Foreigner"> | string | null
    amount?: IntNullableFilter<"Foreigner"> | number | null
    amountText?: StringNullableFilter<"Foreigner"> | string | null
    receiptBookNo?: StringNullableFilter<"Foreigner"> | string | null
    receiptNo?: StringNullableFilter<"Foreigner"> | string | null
    receiptDate?: StringNullableFilter<"Foreigner"> | string | null
    certificateNo?: StringNullableFilter<"Foreigner"> | string | null
    petitionDate?: DateTimeNullableFilter<"Foreigner"> | Date | string | null
    createdAt?: DateTimeFilter<"Foreigner"> | Date | string
    updatedAt?: DateTimeFilter<"Foreigner"> | Date | string
  }, "id">

  export type ForeignerOrderByWithAggregationInput = {
    id?: SortOrder
    sequenceNo?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    foreignerIdNo?: SortOrderInput | SortOrder
    prefix?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    age?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    ethnicity?: SortOrderInput | SortOrder
    certificateRegistrationNo?: SortOrderInput | SortOrder
    certificateDate?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    policeStation?: SortOrderInput | SortOrder
    policeProvince?: SortOrderInput | SortOrder
    houseNo?: SortOrderInput | SortOrder
    moo?: SortOrderInput | SortOrder
    road?: SortOrderInput | SortOrder
    subdistrict?: SortOrderInput | SortOrder
    domicileDistrict?: SortOrderInput | SortOrder
    domicileProvince?: SortOrderInput | SortOrder
    domicile?: SortOrderInput | SortOrder
    applicationType?: SortOrderInput | SortOrder
    applicationDate?: SortOrderInput | SortOrder
    expirationDate?: SortOrderInput | SortOrder
    previousExpirationDate?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    amountText?: SortOrderInput | SortOrder
    receiptBookNo?: SortOrderInput | SortOrder
    receiptNo?: SortOrderInput | SortOrder
    receiptDate?: SortOrderInput | SortOrder
    certificateNo?: SortOrderInput | SortOrder
    petitionDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ForeignerCountOrderByAggregateInput
    _avg?: ForeignerAvgOrderByAggregateInput
    _max?: ForeignerMaxOrderByAggregateInput
    _min?: ForeignerMinOrderByAggregateInput
    _sum?: ForeignerSumOrderByAggregateInput
  }

  export type ForeignerScalarWhereWithAggregatesInput = {
    AND?: ForeignerScalarWhereWithAggregatesInput | ForeignerScalarWhereWithAggregatesInput[]
    OR?: ForeignerScalarWhereWithAggregatesInput[]
    NOT?: ForeignerScalarWhereWithAggregatesInput | ForeignerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Foreigner"> | string
    sequenceNo?: IntNullableWithAggregatesFilter<"Foreigner"> | number | null
    year?: IntNullableWithAggregatesFilter<"Foreigner"> | number | null
    foreignerIdNo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    prefix?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    firstName?: StringWithAggregatesFilter<"Foreigner"> | string
    lastName?: StringWithAggregatesFilter<"Foreigner"> | string
    fullName?: StringWithAggregatesFilter<"Foreigner"> | string
    age?: IntNullableWithAggregatesFilter<"Foreigner"> | number | null
    nationality?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    ethnicity?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    certificateRegistrationNo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    certificateDate?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    district?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    province?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    policeStation?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    policeProvince?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    houseNo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    moo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    road?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    subdistrict?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    domicileDistrict?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    domicileProvince?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    domicile?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    applicationType?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    applicationDate?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    expirationDate?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    previousExpirationDate?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    amount?: IntNullableWithAggregatesFilter<"Foreigner"> | number | null
    amountText?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    receiptBookNo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    receiptNo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    receiptDate?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    certificateNo?: StringNullableWithAggregatesFilter<"Foreigner"> | string | null
    petitionDate?: DateTimeNullableWithAggregatesFilter<"Foreigner"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Foreigner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Foreigner"> | Date | string
  }

  export type ForeignerCreateInput = {
    id?: string
    sequenceNo?: number | null
    year?: number | null
    foreignerIdNo?: string | null
    prefix?: string | null
    firstName: string
    lastName: string
    fullName: string
    age?: number | null
    nationality?: string | null
    ethnicity?: string | null
    certificateRegistrationNo?: string | null
    certificateDate?: string | null
    district?: string | null
    province?: string | null
    policeStation?: string | null
    policeProvince?: string | null
    houseNo?: string | null
    moo?: string | null
    road?: string | null
    subdistrict?: string | null
    domicileDistrict?: string | null
    domicileProvince?: string | null
    domicile?: string | null
    applicationType?: string | null
    applicationDate?: string | null
    expirationDate?: string | null
    previousExpirationDate?: string | null
    amount?: number | null
    amountText?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    certificateNo?: string | null
    petitionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForeignerUncheckedCreateInput = {
    id?: string
    sequenceNo?: number | null
    year?: number | null
    foreignerIdNo?: string | null
    prefix?: string | null
    firstName: string
    lastName: string
    fullName: string
    age?: number | null
    nationality?: string | null
    ethnicity?: string | null
    certificateRegistrationNo?: string | null
    certificateDate?: string | null
    district?: string | null
    province?: string | null
    policeStation?: string | null
    policeProvince?: string | null
    houseNo?: string | null
    moo?: string | null
    road?: string | null
    subdistrict?: string | null
    domicileDistrict?: string | null
    domicileProvince?: string | null
    domicile?: string | null
    applicationType?: string | null
    applicationDate?: string | null
    expirationDate?: string | null
    previousExpirationDate?: string | null
    amount?: number | null
    amountText?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    certificateNo?: string | null
    petitionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForeignerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNo?: NullableIntFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    foreignerIdNo?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    certificateRegistrationNo?: NullableStringFieldUpdateOperationsInput | string | null
    certificateDate?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    policeStation?: NullableStringFieldUpdateOperationsInput | string | null
    policeProvince?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileProvince?: NullableStringFieldUpdateOperationsInput | string | null
    domicile?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    applicationDate?: NullableStringFieldUpdateOperationsInput | string | null
    expirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    previousExpirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    amountText?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    certificateNo?: NullableStringFieldUpdateOperationsInput | string | null
    petitionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNo?: NullableIntFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    foreignerIdNo?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    certificateRegistrationNo?: NullableStringFieldUpdateOperationsInput | string | null
    certificateDate?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    policeStation?: NullableStringFieldUpdateOperationsInput | string | null
    policeProvince?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileProvince?: NullableStringFieldUpdateOperationsInput | string | null
    domicile?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    applicationDate?: NullableStringFieldUpdateOperationsInput | string | null
    expirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    previousExpirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    amountText?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    certificateNo?: NullableStringFieldUpdateOperationsInput | string | null
    petitionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignerCreateManyInput = {
    id?: string
    sequenceNo?: number | null
    year?: number | null
    foreignerIdNo?: string | null
    prefix?: string | null
    firstName: string
    lastName: string
    fullName: string
    age?: number | null
    nationality?: string | null
    ethnicity?: string | null
    certificateRegistrationNo?: string | null
    certificateDate?: string | null
    district?: string | null
    province?: string | null
    policeStation?: string | null
    policeProvince?: string | null
    houseNo?: string | null
    moo?: string | null
    road?: string | null
    subdistrict?: string | null
    domicileDistrict?: string | null
    domicileProvince?: string | null
    domicile?: string | null
    applicationType?: string | null
    applicationDate?: string | null
    expirationDate?: string | null
    previousExpirationDate?: string | null
    amount?: number | null
    amountText?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    certificateNo?: string | null
    petitionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForeignerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNo?: NullableIntFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    foreignerIdNo?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    certificateRegistrationNo?: NullableStringFieldUpdateOperationsInput | string | null
    certificateDate?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    policeStation?: NullableStringFieldUpdateOperationsInput | string | null
    policeProvince?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileProvince?: NullableStringFieldUpdateOperationsInput | string | null
    domicile?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    applicationDate?: NullableStringFieldUpdateOperationsInput | string | null
    expirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    previousExpirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    amountText?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    certificateNo?: NullableStringFieldUpdateOperationsInput | string | null
    petitionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForeignerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceNo?: NullableIntFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    foreignerIdNo?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    certificateRegistrationNo?: NullableStringFieldUpdateOperationsInput | string | null
    certificateDate?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    policeStation?: NullableStringFieldUpdateOperationsInput | string | null
    policeProvince?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    domicileProvince?: NullableStringFieldUpdateOperationsInput | string | null
    domicile?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    applicationDate?: NullableStringFieldUpdateOperationsInput | string | null
    expirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    previousExpirationDate?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    amountText?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    certificateNo?: NullableStringFieldUpdateOperationsInput | string | null
    petitionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ForeignerCountOrderByAggregateInput = {
    id?: SortOrder
    sequenceNo?: SortOrder
    year?: SortOrder
    foreignerIdNo?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    age?: SortOrder
    nationality?: SortOrder
    ethnicity?: SortOrder
    certificateRegistrationNo?: SortOrder
    certificateDate?: SortOrder
    district?: SortOrder
    province?: SortOrder
    policeStation?: SortOrder
    policeProvince?: SortOrder
    houseNo?: SortOrder
    moo?: SortOrder
    road?: SortOrder
    subdistrict?: SortOrder
    domicileDistrict?: SortOrder
    domicileProvince?: SortOrder
    domicile?: SortOrder
    applicationType?: SortOrder
    applicationDate?: SortOrder
    expirationDate?: SortOrder
    previousExpirationDate?: SortOrder
    amount?: SortOrder
    amountText?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    certificateNo?: SortOrder
    petitionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignerAvgOrderByAggregateInput = {
    sequenceNo?: SortOrder
    year?: SortOrder
    age?: SortOrder
    amount?: SortOrder
  }

  export type ForeignerMaxOrderByAggregateInput = {
    id?: SortOrder
    sequenceNo?: SortOrder
    year?: SortOrder
    foreignerIdNo?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    age?: SortOrder
    nationality?: SortOrder
    ethnicity?: SortOrder
    certificateRegistrationNo?: SortOrder
    certificateDate?: SortOrder
    district?: SortOrder
    province?: SortOrder
    policeStation?: SortOrder
    policeProvince?: SortOrder
    houseNo?: SortOrder
    moo?: SortOrder
    road?: SortOrder
    subdistrict?: SortOrder
    domicileDistrict?: SortOrder
    domicileProvince?: SortOrder
    domicile?: SortOrder
    applicationType?: SortOrder
    applicationDate?: SortOrder
    expirationDate?: SortOrder
    previousExpirationDate?: SortOrder
    amount?: SortOrder
    amountText?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    certificateNo?: SortOrder
    petitionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignerMinOrderByAggregateInput = {
    id?: SortOrder
    sequenceNo?: SortOrder
    year?: SortOrder
    foreignerIdNo?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    age?: SortOrder
    nationality?: SortOrder
    ethnicity?: SortOrder
    certificateRegistrationNo?: SortOrder
    certificateDate?: SortOrder
    district?: SortOrder
    province?: SortOrder
    policeStation?: SortOrder
    policeProvince?: SortOrder
    houseNo?: SortOrder
    moo?: SortOrder
    road?: SortOrder
    subdistrict?: SortOrder
    domicileDistrict?: SortOrder
    domicileProvince?: SortOrder
    domicile?: SortOrder
    applicationType?: SortOrder
    applicationDate?: SortOrder
    expirationDate?: SortOrder
    previousExpirationDate?: SortOrder
    amount?: SortOrder
    amountText?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    certificateNo?: SortOrder
    petitionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForeignerSumOrderByAggregateInput = {
    sequenceNo?: SortOrder
    year?: SortOrder
    age?: SortOrder
    amount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}