
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
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model OrganizationCommander
 * 
 */
export type OrganizationCommander = $Result.DefaultSelection<Prisma.$OrganizationCommanderPayload>
/**
 * Model OrganizationFinance
 * 
 */
export type OrganizationFinance = $Result.DefaultSelection<Prisma.$OrganizationFinancePayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Person
 * 
 */
export type Person = $Result.DefaultSelection<Prisma.$PersonPayload>
/**
 * Model PersonStatusHistory
 * 
 */
export type PersonStatusHistory = $Result.DefaultSelection<Prisma.$PersonStatusHistoryPayload>
/**
 * Model RequestInfo
 * 
 */
export type RequestInfo = $Result.DefaultSelection<Prisma.$RequestInfoPayload>
/**
 * Model Receipt
 * 
 */
export type Receipt = $Result.DefaultSelection<Prisma.$ReceiptPayload>
/**
 * Model ForensicSubmission
 * 
 */
export type ForensicSubmission = $Result.DefaultSelection<Prisma.$ForensicSubmissionPayload>
/**
 * Model ForensicSubmissionPerson
 * 
 */
export type ForensicSubmissionPerson = $Result.DefaultSelection<Prisma.$ForensicSubmissionPersonPayload>
/**
 * Model ForensicSubmissionStatusHistory
 * 
 */
export type ForensicSubmissionStatusHistory = $Result.DefaultSelection<Prisma.$ForensicSubmissionStatusHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
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
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
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
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationCommander`: Exposes CRUD operations for the **OrganizationCommander** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationCommanders
    * const organizationCommanders = await prisma.organizationCommander.findMany()
    * ```
    */
  get organizationCommander(): Prisma.OrganizationCommanderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationFinance`: Exposes CRUD operations for the **OrganizationFinance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationFinances
    * const organizationFinances = await prisma.organizationFinance.findMany()
    * ```
    */
  get organizationFinance(): Prisma.OrganizationFinanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personStatusHistory`: Exposes CRUD operations for the **PersonStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonStatusHistories
    * const personStatusHistories = await prisma.personStatusHistory.findMany()
    * ```
    */
  get personStatusHistory(): Prisma.PersonStatusHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestInfo`: Exposes CRUD operations for the **RequestInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestInfos
    * const requestInfos = await prisma.requestInfo.findMany()
    * ```
    */
  get requestInfo(): Prisma.RequestInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.receipt`: Exposes CRUD operations for the **Receipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Receipts
    * const receipts = await prisma.receipt.findMany()
    * ```
    */
  get receipt(): Prisma.ReceiptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forensicSubmission`: Exposes CRUD operations for the **ForensicSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForensicSubmissions
    * const forensicSubmissions = await prisma.forensicSubmission.findMany()
    * ```
    */
  get forensicSubmission(): Prisma.ForensicSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forensicSubmissionPerson`: Exposes CRUD operations for the **ForensicSubmissionPerson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForensicSubmissionPeople
    * const forensicSubmissionPeople = await prisma.forensicSubmissionPerson.findMany()
    * ```
    */
  get forensicSubmissionPerson(): Prisma.ForensicSubmissionPersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forensicSubmissionStatusHistory`: Exposes CRUD operations for the **ForensicSubmissionStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForensicSubmissionStatusHistories
    * const forensicSubmissionStatusHistories = await prisma.forensicSubmissionStatusHistory.findMany()
    * ```
    */
  get forensicSubmissionStatusHistory(): Prisma.ForensicSubmissionStatusHistoryDelegate<ExtArgs, ClientOptions>;
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
    Admin: 'Admin',
    OrganizationCommander: 'OrganizationCommander',
    OrganizationFinance: 'OrganizationFinance',
    Organization: 'Organization',
    Person: 'Person',
    PersonStatusHistory: 'PersonStatusHistory',
    RequestInfo: 'RequestInfo',
    Receipt: 'Receipt',
    ForensicSubmission: 'ForensicSubmission',
    ForensicSubmissionPerson: 'ForensicSubmissionPerson',
    ForensicSubmissionStatusHistory: 'ForensicSubmissionStatusHistory'
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
      modelProps: "admin" | "organizationCommander" | "organizationFinance" | "organization" | "person" | "personStatusHistory" | "requestInfo" | "receipt" | "forensicSubmission" | "forensicSubmissionPerson" | "forensicSubmissionStatusHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      OrganizationCommander: {
        payload: Prisma.$OrganizationCommanderPayload<ExtArgs>
        fields: Prisma.OrganizationCommanderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationCommanderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationCommanderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>
          }
          findFirst: {
            args: Prisma.OrganizationCommanderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationCommanderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>
          }
          findMany: {
            args: Prisma.OrganizationCommanderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>[]
          }
          create: {
            args: Prisma.OrganizationCommanderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>
          }
          createMany: {
            args: Prisma.OrganizationCommanderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCommanderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>[]
          }
          delete: {
            args: Prisma.OrganizationCommanderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>
          }
          update: {
            args: Prisma.OrganizationCommanderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationCommanderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationCommanderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationCommanderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationCommanderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationCommanderPayload>
          }
          aggregate: {
            args: Prisma.OrganizationCommanderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationCommander>
          }
          groupBy: {
            args: Prisma.OrganizationCommanderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCommanderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCommanderCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCommanderCountAggregateOutputType> | number
          }
        }
      }
      OrganizationFinance: {
        payload: Prisma.$OrganizationFinancePayload<ExtArgs>
        fields: Prisma.OrganizationFinanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFinanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFinanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>
          }
          findFirst: {
            args: Prisma.OrganizationFinanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFinanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>
          }
          findMany: {
            args: Prisma.OrganizationFinanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>[]
          }
          create: {
            args: Prisma.OrganizationFinanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>
          }
          createMany: {
            args: Prisma.OrganizationFinanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationFinanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>[]
          }
          delete: {
            args: Prisma.OrganizationFinanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>
          }
          update: {
            args: Prisma.OrganizationFinanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>
          }
          deleteMany: {
            args: Prisma.OrganizationFinanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationFinanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationFinanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>[]
          }
          upsert: {
            args: Prisma.OrganizationFinanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationFinancePayload>
          }
          aggregate: {
            args: Prisma.OrganizationFinanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationFinance>
          }
          groupBy: {
            args: Prisma.OrganizationFinanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationFinanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationFinanceCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationFinanceCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Person: {
        payload: Prisma.$PersonPayload<ExtArgs>
        fields: Prisma.PersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findFirst: {
            args: Prisma.PersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findMany: {
            args: Prisma.PersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          create: {
            args: Prisma.PersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          createMany: {
            args: Prisma.PersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          delete: {
            args: Prisma.PersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          update: {
            args: Prisma.PersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          deleteMany: {
            args: Prisma.PersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          upsert: {
            args: Prisma.PersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          aggregate: {
            args: Prisma.PersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerson>
          }
          groupBy: {
            args: Prisma.PersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonCountArgs<ExtArgs>
            result: $Utils.Optional<PersonCountAggregateOutputType> | number
          }
        }
      }
      PersonStatusHistory: {
        payload: Prisma.$PersonStatusHistoryPayload<ExtArgs>
        fields: Prisma.PersonStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.PersonStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.PersonStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.PersonStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.PersonStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.PersonStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>
          }
          update: {
            args: Prisma.PersonStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PersonStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonStatusHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>[]
          }
          upsert: {
            args: Prisma.PersonStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.PersonStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonStatusHistory>
          }
          groupBy: {
            args: Prisma.PersonStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PersonStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      RequestInfo: {
        payload: Prisma.$RequestInfoPayload<ExtArgs>
        fields: Prisma.RequestInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>
          }
          findFirst: {
            args: Prisma.RequestInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>
          }
          findMany: {
            args: Prisma.RequestInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>[]
          }
          create: {
            args: Prisma.RequestInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>
          }
          createMany: {
            args: Prisma.RequestInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>[]
          }
          delete: {
            args: Prisma.RequestInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>
          }
          update: {
            args: Prisma.RequestInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>
          }
          deleteMany: {
            args: Prisma.RequestInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>[]
          }
          upsert: {
            args: Prisma.RequestInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestInfoPayload>
          }
          aggregate: {
            args: Prisma.RequestInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestInfo>
          }
          groupBy: {
            args: Prisma.RequestInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestInfoCountArgs<ExtArgs>
            result: $Utils.Optional<RequestInfoCountAggregateOutputType> | number
          }
        }
      }
      Receipt: {
        payload: Prisma.$ReceiptPayload<ExtArgs>
        fields: Prisma.ReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findFirst: {
            args: Prisma.ReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findMany: {
            args: Prisma.ReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          create: {
            args: Prisma.ReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          createMany: {
            args: Prisma.ReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          delete: {
            args: Prisma.ReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          update: {
            args: Prisma.ReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          deleteMany: {
            args: Prisma.ReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          upsert: {
            args: Prisma.ReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          aggregate: {
            args: Prisma.ReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReceipt>
          }
          groupBy: {
            args: Prisma.ReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<ReceiptCountAggregateOutputType> | number
          }
        }
      }
      ForensicSubmission: {
        payload: Prisma.$ForensicSubmissionPayload<ExtArgs>
        fields: Prisma.ForensicSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForensicSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForensicSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>
          }
          findFirst: {
            args: Prisma.ForensicSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForensicSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>
          }
          findMany: {
            args: Prisma.ForensicSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>[]
          }
          create: {
            args: Prisma.ForensicSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>
          }
          createMany: {
            args: Prisma.ForensicSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForensicSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>[]
          }
          delete: {
            args: Prisma.ForensicSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>
          }
          update: {
            args: Prisma.ForensicSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.ForensicSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForensicSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForensicSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.ForensicSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPayload>
          }
          aggregate: {
            args: Prisma.ForensicSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForensicSubmission>
          }
          groupBy: {
            args: Prisma.ForensicSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForensicSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForensicSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<ForensicSubmissionCountAggregateOutputType> | number
          }
        }
      }
      ForensicSubmissionPerson: {
        payload: Prisma.$ForensicSubmissionPersonPayload<ExtArgs>
        fields: Prisma.ForensicSubmissionPersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForensicSubmissionPersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForensicSubmissionPersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>
          }
          findFirst: {
            args: Prisma.ForensicSubmissionPersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForensicSubmissionPersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>
          }
          findMany: {
            args: Prisma.ForensicSubmissionPersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>[]
          }
          create: {
            args: Prisma.ForensicSubmissionPersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>
          }
          createMany: {
            args: Prisma.ForensicSubmissionPersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForensicSubmissionPersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>[]
          }
          delete: {
            args: Prisma.ForensicSubmissionPersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>
          }
          update: {
            args: Prisma.ForensicSubmissionPersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>
          }
          deleteMany: {
            args: Prisma.ForensicSubmissionPersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForensicSubmissionPersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForensicSubmissionPersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>[]
          }
          upsert: {
            args: Prisma.ForensicSubmissionPersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionPersonPayload>
          }
          aggregate: {
            args: Prisma.ForensicSubmissionPersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForensicSubmissionPerson>
          }
          groupBy: {
            args: Prisma.ForensicSubmissionPersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForensicSubmissionPersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForensicSubmissionPersonCountArgs<ExtArgs>
            result: $Utils.Optional<ForensicSubmissionPersonCountAggregateOutputType> | number
          }
        }
      }
      ForensicSubmissionStatusHistory: {
        payload: Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>
        fields: Prisma.ForensicSubmissionStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForensicSubmissionStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForensicSubmissionStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.ForensicSubmissionStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForensicSubmissionStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.ForensicSubmissionStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.ForensicSubmissionStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.ForensicSubmissionStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForensicSubmissionStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.ForensicSubmissionStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>
          }
          update: {
            args: Prisma.ForensicSubmissionStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ForensicSubmissionStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForensicSubmissionStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForensicSubmissionStatusHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>[]
          }
          upsert: {
            args: Prisma.ForensicSubmissionStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForensicSubmissionStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.ForensicSubmissionStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForensicSubmissionStatusHistory>
          }
          groupBy: {
            args: Prisma.ForensicSubmissionStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForensicSubmissionStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForensicSubmissionStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ForensicSubmissionStatusHistoryCountAggregateOutputType> | number
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
    admin?: AdminOmit
    organizationCommander?: OrganizationCommanderOmit
    organizationFinance?: OrganizationFinanceOmit
    organization?: OrganizationOmit
    person?: PersonOmit
    personStatusHistory?: PersonStatusHistoryOmit
    requestInfo?: RequestInfoOmit
    receipt?: ReceiptOmit
    forensicSubmission?: ForensicSubmissionOmit
    forensicSubmissionPerson?: ForensicSubmissionPersonOmit
    forensicSubmissionStatusHistory?: ForensicSubmissionStatusHistoryOmit
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
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    persons: number
    receipts: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persons?: boolean | OrganizationCountOutputTypeCountPersonsArgs
    receipts?: boolean | OrganizationCountOutputTypeCountReceiptsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountPersonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountReceiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
  }


  /**
   * Count Type PersonCountOutputType
   */

  export type PersonCountOutputType = {
    receipts: number
    requestInfos: number
    statusHistories: number
    forensicSubmissionPersons: number
  }

  export type PersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipts?: boolean | PersonCountOutputTypeCountReceiptsArgs
    requestInfos?: boolean | PersonCountOutputTypeCountRequestInfosArgs
    statusHistories?: boolean | PersonCountOutputTypeCountStatusHistoriesArgs
    forensicSubmissionPersons?: boolean | PersonCountOutputTypeCountForensicSubmissionPersonsArgs
  }

  // Custom InputTypes
  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: PersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountReceiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountRequestInfosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestInfoWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountStatusHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonStatusHistoryWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountForensicSubmissionPersonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForensicSubmissionPersonWhereInput
  }


  /**
   * Count Type ForensicSubmissionCountOutputType
   */

  export type ForensicSubmissionCountOutputType = {
    persons: number
    statusHistories: number
  }

  export type ForensicSubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persons?: boolean | ForensicSubmissionCountOutputTypeCountPersonsArgs
    statusHistories?: boolean | ForensicSubmissionCountOutputTypeCountStatusHistoriesArgs
  }

  // Custom InputTypes
  /**
   * ForensicSubmissionCountOutputType without action
   */
  export type ForensicSubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionCountOutputType
     */
    select?: ForensicSubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ForensicSubmissionCountOutputType without action
   */
  export type ForensicSubmissionCountOutputTypeCountPersonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForensicSubmissionPersonWhereInput
  }

  /**
   * ForensicSubmissionCountOutputType without action
   */
  export type ForensicSubmissionCountOutputTypeCountStatusHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForensicSubmissionStatusHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    adminId: string | null
    username: string | null
    password: string | null
    name: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    adminId: string | null
    username: string | null
    password: string | null
    name: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    adminId: number
    username: number
    password: number
    name: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    adminId?: true
    username?: true
    password?: true
    name?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    adminId?: true
    username?: true
    password?: true
    name?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    adminId?: true
    username?: true
    password?: true
    name?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    adminId: string
    username: string
    password: string
    name: string
    position: string
    createdAt: Date
    updatedAt: Date | null
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    adminId?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    adminId?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    adminId?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    adminId?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"adminId" | "username" | "password" | "name" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      adminId: string
      username: string
      password: string
      name: string
      position: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `adminId`
     * const adminWithAdminIdOnly = await prisma.admin.findMany({ select: { adminId: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `adminId`
     * const adminWithAdminIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { adminId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `adminId`
     * const adminWithAdminIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { adminId: true },
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
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly adminId: FieldRef<"Admin", 'String'>
    readonly username: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly position: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model OrganizationCommander
   */

  export type AggregateOrganizationCommander = {
    _count: OrganizationCommanderCountAggregateOutputType | null
    _min: OrganizationCommanderMinAggregateOutputType | null
    _max: OrganizationCommanderMaxAggregateOutputType | null
  }

  export type OrganizationCommanderMinAggregateOutputType = {
    commanderId: string | null
    organizationId: string | null
    rank: string | null
    fullRank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    fullPosition: string | null
    signatureImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCommanderMaxAggregateOutputType = {
    commanderId: string | null
    organizationId: string | null
    rank: string | null
    fullRank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    fullPosition: string | null
    signatureImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCommanderCountAggregateOutputType = {
    commanderId: number
    organizationId: number
    rank: number
    fullRank: number
    firstName: number
    lastName: number
    fullName: number
    fullNameWithRank: number
    position: number
    fullPosition: number
    signatureImage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationCommanderMinAggregateInputType = {
    commanderId?: true
    organizationId?: true
    rank?: true
    fullRank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    fullPosition?: true
    signatureImage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCommanderMaxAggregateInputType = {
    commanderId?: true
    organizationId?: true
    rank?: true
    fullRank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    fullPosition?: true
    signatureImage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCommanderCountAggregateInputType = {
    commanderId?: true
    organizationId?: true
    rank?: true
    fullRank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    fullPosition?: true
    signatureImage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationCommanderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationCommander to aggregate.
     */
    where?: OrganizationCommanderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationCommanders to fetch.
     */
    orderBy?: OrganizationCommanderOrderByWithRelationInput | OrganizationCommanderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationCommanderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationCommanders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationCommanders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationCommanders
    **/
    _count?: true | OrganizationCommanderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationCommanderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationCommanderMaxAggregateInputType
  }

  export type GetOrganizationCommanderAggregateType<T extends OrganizationCommanderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationCommander]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationCommander[P]>
      : GetScalarType<T[P], AggregateOrganizationCommander[P]>
  }




  export type OrganizationCommanderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationCommanderWhereInput
    orderBy?: OrganizationCommanderOrderByWithAggregationInput | OrganizationCommanderOrderByWithAggregationInput[]
    by: OrganizationCommanderScalarFieldEnum[] | OrganizationCommanderScalarFieldEnum
    having?: OrganizationCommanderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCommanderCountAggregateInputType | true
    _min?: OrganizationCommanderMinAggregateInputType
    _max?: OrganizationCommanderMaxAggregateInputType
  }

  export type OrganizationCommanderGroupByOutputType = {
    commanderId: string
    organizationId: string
    rank: string | null
    fullRank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    fullPosition: string | null
    signatureImage: string | null
    createdAt: Date
    updatedAt: Date | null
    _count: OrganizationCommanderCountAggregateOutputType | null
    _min: OrganizationCommanderMinAggregateOutputType | null
    _max: OrganizationCommanderMaxAggregateOutputType | null
  }

  type GetOrganizationCommanderGroupByPayload<T extends OrganizationCommanderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationCommanderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationCommanderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationCommanderGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationCommanderGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationCommanderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commanderId?: boolean
    organizationId?: boolean
    rank?: boolean
    fullRank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    fullPosition?: boolean
    signatureImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationCommander"]>

  export type OrganizationCommanderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commanderId?: boolean
    organizationId?: boolean
    rank?: boolean
    fullRank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    fullPosition?: boolean
    signatureImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationCommander"]>

  export type OrganizationCommanderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commanderId?: boolean
    organizationId?: boolean
    rank?: boolean
    fullRank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    fullPosition?: boolean
    signatureImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationCommander"]>

  export type OrganizationCommanderSelectScalar = {
    commanderId?: boolean
    organizationId?: boolean
    rank?: boolean
    fullRank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    fullPosition?: boolean
    signatureImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationCommanderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"commanderId" | "organizationId" | "rank" | "fullRank" | "firstName" | "lastName" | "fullName" | "fullNameWithRank" | "position" | "fullPosition" | "signatureImage" | "createdAt" | "updatedAt", ExtArgs["result"]["organizationCommander"]>
  export type OrganizationCommanderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationCommanderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationCommanderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationCommanderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationCommander"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      commanderId: string
      organizationId: string
      rank: string | null
      fullRank: string | null
      firstName: string | null
      lastName: string | null
      fullName: string | null
      fullNameWithRank: string | null
      position: string | null
      fullPosition: string | null
      signatureImage: string | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["organizationCommander"]>
    composites: {}
  }

  type OrganizationCommanderGetPayload<S extends boolean | null | undefined | OrganizationCommanderDefaultArgs> = $Result.GetResult<Prisma.$OrganizationCommanderPayload, S>

  type OrganizationCommanderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationCommanderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCommanderCountAggregateInputType | true
    }

  export interface OrganizationCommanderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationCommander'], meta: { name: 'OrganizationCommander' } }
    /**
     * Find zero or one OrganizationCommander that matches the filter.
     * @param {OrganizationCommanderFindUniqueArgs} args - Arguments to find a OrganizationCommander
     * @example
     * // Get one OrganizationCommander
     * const organizationCommander = await prisma.organizationCommander.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationCommanderFindUniqueArgs>(args: SelectSubset<T, OrganizationCommanderFindUniqueArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationCommander that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationCommanderFindUniqueOrThrowArgs} args - Arguments to find a OrganizationCommander
     * @example
     * // Get one OrganizationCommander
     * const organizationCommander = await prisma.organizationCommander.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationCommanderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationCommanderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationCommander that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderFindFirstArgs} args - Arguments to find a OrganizationCommander
     * @example
     * // Get one OrganizationCommander
     * const organizationCommander = await prisma.organizationCommander.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationCommanderFindFirstArgs>(args?: SelectSubset<T, OrganizationCommanderFindFirstArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationCommander that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderFindFirstOrThrowArgs} args - Arguments to find a OrganizationCommander
     * @example
     * // Get one OrganizationCommander
     * const organizationCommander = await prisma.organizationCommander.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationCommanderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationCommanderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationCommanders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationCommanders
     * const organizationCommanders = await prisma.organizationCommander.findMany()
     * 
     * // Get first 10 OrganizationCommanders
     * const organizationCommanders = await prisma.organizationCommander.findMany({ take: 10 })
     * 
     * // Only select the `commanderId`
     * const organizationCommanderWithCommanderIdOnly = await prisma.organizationCommander.findMany({ select: { commanderId: true } })
     * 
     */
    findMany<T extends OrganizationCommanderFindManyArgs>(args?: SelectSubset<T, OrganizationCommanderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationCommander.
     * @param {OrganizationCommanderCreateArgs} args - Arguments to create a OrganizationCommander.
     * @example
     * // Create one OrganizationCommander
     * const OrganizationCommander = await prisma.organizationCommander.create({
     *   data: {
     *     // ... data to create a OrganizationCommander
     *   }
     * })
     * 
     */
    create<T extends OrganizationCommanderCreateArgs>(args: SelectSubset<T, OrganizationCommanderCreateArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationCommanders.
     * @param {OrganizationCommanderCreateManyArgs} args - Arguments to create many OrganizationCommanders.
     * @example
     * // Create many OrganizationCommanders
     * const organizationCommander = await prisma.organizationCommander.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCommanderCreateManyArgs>(args?: SelectSubset<T, OrganizationCommanderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationCommanders and returns the data saved in the database.
     * @param {OrganizationCommanderCreateManyAndReturnArgs} args - Arguments to create many OrganizationCommanders.
     * @example
     * // Create many OrganizationCommanders
     * const organizationCommander = await prisma.organizationCommander.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationCommanders and only return the `commanderId`
     * const organizationCommanderWithCommanderIdOnly = await prisma.organizationCommander.createManyAndReturn({
     *   select: { commanderId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCommanderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCommanderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationCommander.
     * @param {OrganizationCommanderDeleteArgs} args - Arguments to delete one OrganizationCommander.
     * @example
     * // Delete one OrganizationCommander
     * const OrganizationCommander = await prisma.organizationCommander.delete({
     *   where: {
     *     // ... filter to delete one OrganizationCommander
     *   }
     * })
     * 
     */
    delete<T extends OrganizationCommanderDeleteArgs>(args: SelectSubset<T, OrganizationCommanderDeleteArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationCommander.
     * @param {OrganizationCommanderUpdateArgs} args - Arguments to update one OrganizationCommander.
     * @example
     * // Update one OrganizationCommander
     * const organizationCommander = await prisma.organizationCommander.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationCommanderUpdateArgs>(args: SelectSubset<T, OrganizationCommanderUpdateArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationCommanders.
     * @param {OrganizationCommanderDeleteManyArgs} args - Arguments to filter OrganizationCommanders to delete.
     * @example
     * // Delete a few OrganizationCommanders
     * const { count } = await prisma.organizationCommander.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationCommanderDeleteManyArgs>(args?: SelectSubset<T, OrganizationCommanderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationCommanders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationCommanders
     * const organizationCommander = await prisma.organizationCommander.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationCommanderUpdateManyArgs>(args: SelectSubset<T, OrganizationCommanderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationCommanders and returns the data updated in the database.
     * @param {OrganizationCommanderUpdateManyAndReturnArgs} args - Arguments to update many OrganizationCommanders.
     * @example
     * // Update many OrganizationCommanders
     * const organizationCommander = await prisma.organizationCommander.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationCommanders and only return the `commanderId`
     * const organizationCommanderWithCommanderIdOnly = await prisma.organizationCommander.updateManyAndReturn({
     *   select: { commanderId: true },
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
    updateManyAndReturn<T extends OrganizationCommanderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationCommanderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationCommander.
     * @param {OrganizationCommanderUpsertArgs} args - Arguments to update or create a OrganizationCommander.
     * @example
     * // Update or create a OrganizationCommander
     * const organizationCommander = await prisma.organizationCommander.upsert({
     *   create: {
     *     // ... data to create a OrganizationCommander
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationCommander we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationCommanderUpsertArgs>(args: SelectSubset<T, OrganizationCommanderUpsertArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationCommanders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderCountArgs} args - Arguments to filter OrganizationCommanders to count.
     * @example
     * // Count the number of OrganizationCommanders
     * const count = await prisma.organizationCommander.count({
     *   where: {
     *     // ... the filter for the OrganizationCommanders we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCommanderCountArgs>(
      args?: Subset<T, OrganizationCommanderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCommanderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationCommander.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationCommanderAggregateArgs>(args: Subset<T, OrganizationCommanderAggregateArgs>): Prisma.PrismaPromise<GetOrganizationCommanderAggregateType<T>>

    /**
     * Group by OrganizationCommander.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCommanderGroupByArgs} args - Group by arguments.
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
      T extends OrganizationCommanderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationCommanderGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationCommanderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationCommanderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationCommanderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationCommander model
   */
  readonly fields: OrganizationCommanderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationCommander.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationCommanderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrganizationCommander model
   */
  interface OrganizationCommanderFieldRefs {
    readonly commanderId: FieldRef<"OrganizationCommander", 'String'>
    readonly organizationId: FieldRef<"OrganizationCommander", 'String'>
    readonly rank: FieldRef<"OrganizationCommander", 'String'>
    readonly fullRank: FieldRef<"OrganizationCommander", 'String'>
    readonly firstName: FieldRef<"OrganizationCommander", 'String'>
    readonly lastName: FieldRef<"OrganizationCommander", 'String'>
    readonly fullName: FieldRef<"OrganizationCommander", 'String'>
    readonly fullNameWithRank: FieldRef<"OrganizationCommander", 'String'>
    readonly position: FieldRef<"OrganizationCommander", 'String'>
    readonly fullPosition: FieldRef<"OrganizationCommander", 'String'>
    readonly signatureImage: FieldRef<"OrganizationCommander", 'String'>
    readonly createdAt: FieldRef<"OrganizationCommander", 'DateTime'>
    readonly updatedAt: FieldRef<"OrganizationCommander", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationCommander findUnique
   */
  export type OrganizationCommanderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationCommander to fetch.
     */
    where: OrganizationCommanderWhereUniqueInput
  }

  /**
   * OrganizationCommander findUniqueOrThrow
   */
  export type OrganizationCommanderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationCommander to fetch.
     */
    where: OrganizationCommanderWhereUniqueInput
  }

  /**
   * OrganizationCommander findFirst
   */
  export type OrganizationCommanderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationCommander to fetch.
     */
    where?: OrganizationCommanderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationCommanders to fetch.
     */
    orderBy?: OrganizationCommanderOrderByWithRelationInput | OrganizationCommanderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationCommanders.
     */
    cursor?: OrganizationCommanderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationCommanders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationCommanders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationCommanders.
     */
    distinct?: OrganizationCommanderScalarFieldEnum | OrganizationCommanderScalarFieldEnum[]
  }

  /**
   * OrganizationCommander findFirstOrThrow
   */
  export type OrganizationCommanderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationCommander to fetch.
     */
    where?: OrganizationCommanderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationCommanders to fetch.
     */
    orderBy?: OrganizationCommanderOrderByWithRelationInput | OrganizationCommanderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationCommanders.
     */
    cursor?: OrganizationCommanderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationCommanders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationCommanders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationCommanders.
     */
    distinct?: OrganizationCommanderScalarFieldEnum | OrganizationCommanderScalarFieldEnum[]
  }

  /**
   * OrganizationCommander findMany
   */
  export type OrganizationCommanderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationCommanders to fetch.
     */
    where?: OrganizationCommanderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationCommanders to fetch.
     */
    orderBy?: OrganizationCommanderOrderByWithRelationInput | OrganizationCommanderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationCommanders.
     */
    cursor?: OrganizationCommanderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationCommanders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationCommanders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationCommanders.
     */
    distinct?: OrganizationCommanderScalarFieldEnum | OrganizationCommanderScalarFieldEnum[]
  }

  /**
   * OrganizationCommander create
   */
  export type OrganizationCommanderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationCommander.
     */
    data: XOR<OrganizationCommanderCreateInput, OrganizationCommanderUncheckedCreateInput>
  }

  /**
   * OrganizationCommander createMany
   */
  export type OrganizationCommanderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationCommanders.
     */
    data: OrganizationCommanderCreateManyInput | OrganizationCommanderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationCommander createManyAndReturn
   */
  export type OrganizationCommanderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationCommanders.
     */
    data: OrganizationCommanderCreateManyInput | OrganizationCommanderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationCommander update
   */
  export type OrganizationCommanderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationCommander.
     */
    data: XOR<OrganizationCommanderUpdateInput, OrganizationCommanderUncheckedUpdateInput>
    /**
     * Choose, which OrganizationCommander to update.
     */
    where: OrganizationCommanderWhereUniqueInput
  }

  /**
   * OrganizationCommander updateMany
   */
  export type OrganizationCommanderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationCommanders.
     */
    data: XOR<OrganizationCommanderUpdateManyMutationInput, OrganizationCommanderUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationCommanders to update
     */
    where?: OrganizationCommanderWhereInput
    /**
     * Limit how many OrganizationCommanders to update.
     */
    limit?: number
  }

  /**
   * OrganizationCommander updateManyAndReturn
   */
  export type OrganizationCommanderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationCommanders.
     */
    data: XOR<OrganizationCommanderUpdateManyMutationInput, OrganizationCommanderUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationCommanders to update
     */
    where?: OrganizationCommanderWhereInput
    /**
     * Limit how many OrganizationCommanders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationCommander upsert
   */
  export type OrganizationCommanderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationCommander to update in case it exists.
     */
    where: OrganizationCommanderWhereUniqueInput
    /**
     * In case the OrganizationCommander found by the `where` argument doesn't exist, create a new OrganizationCommander with this data.
     */
    create: XOR<OrganizationCommanderCreateInput, OrganizationCommanderUncheckedCreateInput>
    /**
     * In case the OrganizationCommander was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationCommanderUpdateInput, OrganizationCommanderUncheckedUpdateInput>
  }

  /**
   * OrganizationCommander delete
   */
  export type OrganizationCommanderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    /**
     * Filter which OrganizationCommander to delete.
     */
    where: OrganizationCommanderWhereUniqueInput
  }

  /**
   * OrganizationCommander deleteMany
   */
  export type OrganizationCommanderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationCommanders to delete
     */
    where?: OrganizationCommanderWhereInput
    /**
     * Limit how many OrganizationCommanders to delete.
     */
    limit?: number
  }

  /**
   * OrganizationCommander without action
   */
  export type OrganizationCommanderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationFinance
   */

  export type AggregateOrganizationFinance = {
    _count: OrganizationFinanceCountAggregateOutputType | null
    _min: OrganizationFinanceMinAggregateOutputType | null
    _max: OrganizationFinanceMaxAggregateOutputType | null
  }

  export type OrganizationFinanceMinAggregateOutputType = {
    financeId: string | null
    organizationId: string | null
    rank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationFinanceMaxAggregateOutputType = {
    financeId: string | null
    organizationId: string | null
    rank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationFinanceCountAggregateOutputType = {
    financeId: number
    organizationId: number
    rank: number
    firstName: number
    lastName: number
    fullName: number
    fullNameWithRank: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationFinanceMinAggregateInputType = {
    financeId?: true
    organizationId?: true
    rank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationFinanceMaxAggregateInputType = {
    financeId?: true
    organizationId?: true
    rank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationFinanceCountAggregateInputType = {
    financeId?: true
    organizationId?: true
    rank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationFinanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationFinance to aggregate.
     */
    where?: OrganizationFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFinances to fetch.
     */
    orderBy?: OrganizationFinanceOrderByWithRelationInput | OrganizationFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationFinances
    **/
    _count?: true | OrganizationFinanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationFinanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationFinanceMaxAggregateInputType
  }

  export type GetOrganizationFinanceAggregateType<T extends OrganizationFinanceAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationFinance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationFinance[P]>
      : GetScalarType<T[P], AggregateOrganizationFinance[P]>
  }




  export type OrganizationFinanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationFinanceWhereInput
    orderBy?: OrganizationFinanceOrderByWithAggregationInput | OrganizationFinanceOrderByWithAggregationInput[]
    by: OrganizationFinanceScalarFieldEnum[] | OrganizationFinanceScalarFieldEnum
    having?: OrganizationFinanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationFinanceCountAggregateInputType | true
    _min?: OrganizationFinanceMinAggregateInputType
    _max?: OrganizationFinanceMaxAggregateInputType
  }

  export type OrganizationFinanceGroupByOutputType = {
    financeId: string
    organizationId: string
    rank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    createdAt: Date
    updatedAt: Date | null
    _count: OrganizationFinanceCountAggregateOutputType | null
    _min: OrganizationFinanceMinAggregateOutputType | null
    _max: OrganizationFinanceMaxAggregateOutputType | null
  }

  type GetOrganizationFinanceGroupByPayload<T extends OrganizationFinanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationFinanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationFinanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationFinanceGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationFinanceGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationFinanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    financeId?: boolean
    organizationId?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationFinance"]>

  export type OrganizationFinanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    financeId?: boolean
    organizationId?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationFinance"]>

  export type OrganizationFinanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    financeId?: boolean
    organizationId?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationFinance"]>

  export type OrganizationFinanceSelectScalar = {
    financeId?: boolean
    organizationId?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationFinanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"financeId" | "organizationId" | "rank" | "firstName" | "lastName" | "fullName" | "fullNameWithRank" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["organizationFinance"]>
  export type OrganizationFinanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationFinanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationFinanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationFinancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationFinance"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      financeId: string
      organizationId: string
      rank: string | null
      firstName: string | null
      lastName: string | null
      fullName: string | null
      fullNameWithRank: string | null
      position: string | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["organizationFinance"]>
    composites: {}
  }

  type OrganizationFinanceGetPayload<S extends boolean | null | undefined | OrganizationFinanceDefaultArgs> = $Result.GetResult<Prisma.$OrganizationFinancePayload, S>

  type OrganizationFinanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFinanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationFinanceCountAggregateInputType | true
    }

  export interface OrganizationFinanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationFinance'], meta: { name: 'OrganizationFinance' } }
    /**
     * Find zero or one OrganizationFinance that matches the filter.
     * @param {OrganizationFinanceFindUniqueArgs} args - Arguments to find a OrganizationFinance
     * @example
     * // Get one OrganizationFinance
     * const organizationFinance = await prisma.organizationFinance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFinanceFindUniqueArgs>(args: SelectSubset<T, OrganizationFinanceFindUniqueArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationFinance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFinanceFindUniqueOrThrowArgs} args - Arguments to find a OrganizationFinance
     * @example
     * // Get one OrganizationFinance
     * const organizationFinance = await prisma.organizationFinance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFinanceFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFinanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationFinance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceFindFirstArgs} args - Arguments to find a OrganizationFinance
     * @example
     * // Get one OrganizationFinance
     * const organizationFinance = await prisma.organizationFinance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFinanceFindFirstArgs>(args?: SelectSubset<T, OrganizationFinanceFindFirstArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationFinance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceFindFirstOrThrowArgs} args - Arguments to find a OrganizationFinance
     * @example
     * // Get one OrganizationFinance
     * const organizationFinance = await prisma.organizationFinance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFinanceFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFinanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationFinances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationFinances
     * const organizationFinances = await prisma.organizationFinance.findMany()
     * 
     * // Get first 10 OrganizationFinances
     * const organizationFinances = await prisma.organizationFinance.findMany({ take: 10 })
     * 
     * // Only select the `financeId`
     * const organizationFinanceWithFinanceIdOnly = await prisma.organizationFinance.findMany({ select: { financeId: true } })
     * 
     */
    findMany<T extends OrganizationFinanceFindManyArgs>(args?: SelectSubset<T, OrganizationFinanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationFinance.
     * @param {OrganizationFinanceCreateArgs} args - Arguments to create a OrganizationFinance.
     * @example
     * // Create one OrganizationFinance
     * const OrganizationFinance = await prisma.organizationFinance.create({
     *   data: {
     *     // ... data to create a OrganizationFinance
     *   }
     * })
     * 
     */
    create<T extends OrganizationFinanceCreateArgs>(args: SelectSubset<T, OrganizationFinanceCreateArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationFinances.
     * @param {OrganizationFinanceCreateManyArgs} args - Arguments to create many OrganizationFinances.
     * @example
     * // Create many OrganizationFinances
     * const organizationFinance = await prisma.organizationFinance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationFinanceCreateManyArgs>(args?: SelectSubset<T, OrganizationFinanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationFinances and returns the data saved in the database.
     * @param {OrganizationFinanceCreateManyAndReturnArgs} args - Arguments to create many OrganizationFinances.
     * @example
     * // Create many OrganizationFinances
     * const organizationFinance = await prisma.organizationFinance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationFinances and only return the `financeId`
     * const organizationFinanceWithFinanceIdOnly = await prisma.organizationFinance.createManyAndReturn({
     *   select: { financeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationFinanceCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationFinanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationFinance.
     * @param {OrganizationFinanceDeleteArgs} args - Arguments to delete one OrganizationFinance.
     * @example
     * // Delete one OrganizationFinance
     * const OrganizationFinance = await prisma.organizationFinance.delete({
     *   where: {
     *     // ... filter to delete one OrganizationFinance
     *   }
     * })
     * 
     */
    delete<T extends OrganizationFinanceDeleteArgs>(args: SelectSubset<T, OrganizationFinanceDeleteArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationFinance.
     * @param {OrganizationFinanceUpdateArgs} args - Arguments to update one OrganizationFinance.
     * @example
     * // Update one OrganizationFinance
     * const organizationFinance = await prisma.organizationFinance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationFinanceUpdateArgs>(args: SelectSubset<T, OrganizationFinanceUpdateArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationFinances.
     * @param {OrganizationFinanceDeleteManyArgs} args - Arguments to filter OrganizationFinances to delete.
     * @example
     * // Delete a few OrganizationFinances
     * const { count } = await prisma.organizationFinance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationFinanceDeleteManyArgs>(args?: SelectSubset<T, OrganizationFinanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationFinances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationFinances
     * const organizationFinance = await prisma.organizationFinance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationFinanceUpdateManyArgs>(args: SelectSubset<T, OrganizationFinanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationFinances and returns the data updated in the database.
     * @param {OrganizationFinanceUpdateManyAndReturnArgs} args - Arguments to update many OrganizationFinances.
     * @example
     * // Update many OrganizationFinances
     * const organizationFinance = await prisma.organizationFinance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationFinances and only return the `financeId`
     * const organizationFinanceWithFinanceIdOnly = await prisma.organizationFinance.updateManyAndReturn({
     *   select: { financeId: true },
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
    updateManyAndReturn<T extends OrganizationFinanceUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationFinanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationFinance.
     * @param {OrganizationFinanceUpsertArgs} args - Arguments to update or create a OrganizationFinance.
     * @example
     * // Update or create a OrganizationFinance
     * const organizationFinance = await prisma.organizationFinance.upsert({
     *   create: {
     *     // ... data to create a OrganizationFinance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationFinance we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationFinanceUpsertArgs>(args: SelectSubset<T, OrganizationFinanceUpsertArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationFinances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceCountArgs} args - Arguments to filter OrganizationFinances to count.
     * @example
     * // Count the number of OrganizationFinances
     * const count = await prisma.organizationFinance.count({
     *   where: {
     *     // ... the filter for the OrganizationFinances we want to count
     *   }
     * })
    **/
    count<T extends OrganizationFinanceCountArgs>(
      args?: Subset<T, OrganizationFinanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationFinanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationFinance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationFinanceAggregateArgs>(args: Subset<T, OrganizationFinanceAggregateArgs>): Prisma.PrismaPromise<GetOrganizationFinanceAggregateType<T>>

    /**
     * Group by OrganizationFinance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFinanceGroupByArgs} args - Group by arguments.
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
      T extends OrganizationFinanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationFinanceGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationFinanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationFinanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationFinanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationFinance model
   */
  readonly fields: OrganizationFinanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationFinance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationFinanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrganizationFinance model
   */
  interface OrganizationFinanceFieldRefs {
    readonly financeId: FieldRef<"OrganizationFinance", 'String'>
    readonly organizationId: FieldRef<"OrganizationFinance", 'String'>
    readonly rank: FieldRef<"OrganizationFinance", 'String'>
    readonly firstName: FieldRef<"OrganizationFinance", 'String'>
    readonly lastName: FieldRef<"OrganizationFinance", 'String'>
    readonly fullName: FieldRef<"OrganizationFinance", 'String'>
    readonly fullNameWithRank: FieldRef<"OrganizationFinance", 'String'>
    readonly position: FieldRef<"OrganizationFinance", 'String'>
    readonly createdAt: FieldRef<"OrganizationFinance", 'DateTime'>
    readonly updatedAt: FieldRef<"OrganizationFinance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationFinance findUnique
   */
  export type OrganizationFinanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFinance to fetch.
     */
    where: OrganizationFinanceWhereUniqueInput
  }

  /**
   * OrganizationFinance findUniqueOrThrow
   */
  export type OrganizationFinanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFinance to fetch.
     */
    where: OrganizationFinanceWhereUniqueInput
  }

  /**
   * OrganizationFinance findFirst
   */
  export type OrganizationFinanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFinance to fetch.
     */
    where?: OrganizationFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFinances to fetch.
     */
    orderBy?: OrganizationFinanceOrderByWithRelationInput | OrganizationFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationFinances.
     */
    cursor?: OrganizationFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationFinances.
     */
    distinct?: OrganizationFinanceScalarFieldEnum | OrganizationFinanceScalarFieldEnum[]
  }

  /**
   * OrganizationFinance findFirstOrThrow
   */
  export type OrganizationFinanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFinance to fetch.
     */
    where?: OrganizationFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFinances to fetch.
     */
    orderBy?: OrganizationFinanceOrderByWithRelationInput | OrganizationFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationFinances.
     */
    cursor?: OrganizationFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationFinances.
     */
    distinct?: OrganizationFinanceScalarFieldEnum | OrganizationFinanceScalarFieldEnum[]
  }

  /**
   * OrganizationFinance findMany
   */
  export type OrganizationFinanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationFinances to fetch.
     */
    where?: OrganizationFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationFinances to fetch.
     */
    orderBy?: OrganizationFinanceOrderByWithRelationInput | OrganizationFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationFinances.
     */
    cursor?: OrganizationFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationFinances.
     */
    distinct?: OrganizationFinanceScalarFieldEnum | OrganizationFinanceScalarFieldEnum[]
  }

  /**
   * OrganizationFinance create
   */
  export type OrganizationFinanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationFinance.
     */
    data: XOR<OrganizationFinanceCreateInput, OrganizationFinanceUncheckedCreateInput>
  }

  /**
   * OrganizationFinance createMany
   */
  export type OrganizationFinanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationFinances.
     */
    data: OrganizationFinanceCreateManyInput | OrganizationFinanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationFinance createManyAndReturn
   */
  export type OrganizationFinanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationFinances.
     */
    data: OrganizationFinanceCreateManyInput | OrganizationFinanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationFinance update
   */
  export type OrganizationFinanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationFinance.
     */
    data: XOR<OrganizationFinanceUpdateInput, OrganizationFinanceUncheckedUpdateInput>
    /**
     * Choose, which OrganizationFinance to update.
     */
    where: OrganizationFinanceWhereUniqueInput
  }

  /**
   * OrganizationFinance updateMany
   */
  export type OrganizationFinanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationFinances.
     */
    data: XOR<OrganizationFinanceUpdateManyMutationInput, OrganizationFinanceUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationFinances to update
     */
    where?: OrganizationFinanceWhereInput
    /**
     * Limit how many OrganizationFinances to update.
     */
    limit?: number
  }

  /**
   * OrganizationFinance updateManyAndReturn
   */
  export type OrganizationFinanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationFinances.
     */
    data: XOR<OrganizationFinanceUpdateManyMutationInput, OrganizationFinanceUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationFinances to update
     */
    where?: OrganizationFinanceWhereInput
    /**
     * Limit how many OrganizationFinances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationFinance upsert
   */
  export type OrganizationFinanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationFinance to update in case it exists.
     */
    where: OrganizationFinanceWhereUniqueInput
    /**
     * In case the OrganizationFinance found by the `where` argument doesn't exist, create a new OrganizationFinance with this data.
     */
    create: XOR<OrganizationFinanceCreateInput, OrganizationFinanceUncheckedCreateInput>
    /**
     * In case the OrganizationFinance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationFinanceUpdateInput, OrganizationFinanceUncheckedUpdateInput>
  }

  /**
   * OrganizationFinance delete
   */
  export type OrganizationFinanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    /**
     * Filter which OrganizationFinance to delete.
     */
    where: OrganizationFinanceWhereUniqueInput
  }

  /**
   * OrganizationFinance deleteMany
   */
  export type OrganizationFinanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationFinances to delete
     */
    where?: OrganizationFinanceWhereInput
    /**
     * Limit how many OrganizationFinances to delete.
     */
    limit?: number
  }

  /**
   * OrganizationFinance without action
   */
  export type OrganizationFinanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    organizationId: string | null
    key: string | null
    organizationName: string | null
    rank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    organizationId: string | null
    key: string | null
    organizationName: string | null
    rank: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    fullNameWithRank: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    organizationId: number
    key: number
    organizationName: number
    rank: number
    firstName: number
    lastName: number
    fullName: number
    fullNameWithRank: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    organizationId?: true
    key?: true
    organizationName?: true
    rank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    organizationId?: true
    key?: true
    organizationName?: true
    rank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    organizationId?: true
    key?: true
    organizationName?: true
    rank?: true
    firstName?: true
    lastName?: true
    fullName?: true
    fullNameWithRank?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    organizationId: string
    key: string
    organizationName: string
    rank: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt: Date
    updatedAt: Date | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizationId?: boolean
    key?: boolean
    organizationName?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    commander?: boolean | Organization$commanderArgs<ExtArgs>
    finance?: boolean | Organization$financeArgs<ExtArgs>
    persons?: boolean | Organization$personsArgs<ExtArgs>
    receipts?: boolean | Organization$receiptsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizationId?: boolean
    key?: boolean
    organizationName?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizationId?: boolean
    key?: boolean
    organizationName?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    organizationId?: boolean
    key?: boolean
    organizationName?: boolean
    rank?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    fullNameWithRank?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"organizationId" | "key" | "organizationName" | "rank" | "firstName" | "lastName" | "fullName" | "fullNameWithRank" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commander?: boolean | Organization$commanderArgs<ExtArgs>
    finance?: boolean | Organization$financeArgs<ExtArgs>
    persons?: boolean | Organization$personsArgs<ExtArgs>
    receipts?: boolean | Organization$receiptsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      commander: Prisma.$OrganizationCommanderPayload<ExtArgs> | null
      finance: Prisma.$OrganizationFinancePayload<ExtArgs> | null
      persons: Prisma.$PersonPayload<ExtArgs>[]
      receipts: Prisma.$ReceiptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      organizationId: string
      key: string
      organizationName: string
      rank: string | null
      firstName: string
      lastName: string
      fullName: string
      fullNameWithRank: string
      position: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `organizationId`
     * const organizationWithOrganizationIdOnly = await prisma.organization.findMany({ select: { organizationId: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `organizationId`
     * const organizationWithOrganizationIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { organizationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `organizationId`
     * const organizationWithOrganizationIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { organizationId: true },
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
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
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
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commander<T extends Organization$commanderArgs<ExtArgs> = {}>(args?: Subset<T, Organization$commanderArgs<ExtArgs>>): Prisma__OrganizationCommanderClient<$Result.GetResult<Prisma.$OrganizationCommanderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    finance<T extends Organization$financeArgs<ExtArgs> = {}>(args?: Subset<T, Organization$financeArgs<ExtArgs>>): Prisma__OrganizationFinanceClient<$Result.GetResult<Prisma.$OrganizationFinancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    persons<T extends Organization$personsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$personsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receipts<T extends Organization$receiptsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly organizationId: FieldRef<"Organization", 'String'>
    readonly key: FieldRef<"Organization", 'String'>
    readonly organizationName: FieldRef<"Organization", 'String'>
    readonly rank: FieldRef<"Organization", 'String'>
    readonly firstName: FieldRef<"Organization", 'String'>
    readonly lastName: FieldRef<"Organization", 'String'>
    readonly fullName: FieldRef<"Organization", 'String'>
    readonly fullNameWithRank: FieldRef<"Organization", 'String'>
    readonly position: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.commander
   */
  export type Organization$commanderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCommander
     */
    select?: OrganizationCommanderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationCommander
     */
    omit?: OrganizationCommanderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationCommanderInclude<ExtArgs> | null
    where?: OrganizationCommanderWhereInput
  }

  /**
   * Organization.finance
   */
  export type Organization$financeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationFinance
     */
    select?: OrganizationFinanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationFinance
     */
    omit?: OrganizationFinanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationFinanceInclude<ExtArgs> | null
    where?: OrganizationFinanceWhereInput
  }

  /**
   * Organization.persons
   */
  export type Organization$personsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Organization.receipts
   */
  export type Organization$receiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    cursor?: ReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Person
   */

  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  export type PersonAvgAggregateOutputType = {
    weight: number | null
    height: number | null
    money: number | null
    status: number | null
    priority: number | null
  }

  export type PersonSumAggregateOutputType = {
    weight: number | null
    height: number | null
    money: number | null
    status: number | null
    priority: number | null
  }

  export type PersonMinAggregateOutputType = {
    personId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    prefix: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    citizenId: string | null
    birthDate: string | null
    birthDay: string | null
    birthMonth: string | null
    birthYear: string | null
    nationality: string | null
    ethnicity: string | null
    weight: number | null
    height: number | null
    bodyType: string | null
    skinColor: string | null
    behavior: string | null
    distinguishingMarks: string | null
    address: string | null
    occupation: string | null
    workplaceAddress: string | null
    father: string | null
    mother: string | null
    spouse: string | null
    fingerprintDate: string | null
    purpose: string | null
    requestingAgency: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    money: number | null
    moneyText: string | null
    status: number | null
    statusUpdatedAt: Date | null
    deleteAt: Date | null
    organizationId: string | null
    organizationName: string | null
    fullNameOrg: string | null
    rank: string | null
    position: string | null
    fullNameWithRank: string | null
    priority: number | null
    returnDate: Date | null
  }

  export type PersonMaxAggregateOutputType = {
    personId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    prefix: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    citizenId: string | null
    birthDate: string | null
    birthDay: string | null
    birthMonth: string | null
    birthYear: string | null
    nationality: string | null
    ethnicity: string | null
    weight: number | null
    height: number | null
    bodyType: string | null
    skinColor: string | null
    behavior: string | null
    distinguishingMarks: string | null
    address: string | null
    occupation: string | null
    workplaceAddress: string | null
    father: string | null
    mother: string | null
    spouse: string | null
    fingerprintDate: string | null
    purpose: string | null
    requestingAgency: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    money: number | null
    moneyText: string | null
    status: number | null
    statusUpdatedAt: Date | null
    deleteAt: Date | null
    organizationId: string | null
    organizationName: string | null
    fullNameOrg: string | null
    rank: string | null
    position: string | null
    fullNameWithRank: string | null
    priority: number | null
    returnDate: Date | null
  }

  export type PersonCountAggregateOutputType = {
    personId: number
    createdAt: number
    updatedAt: number
    prefix: number
    firstName: number
    lastName: number
    fullName: number
    citizenId: number
    birthDate: number
    birthDay: number
    birthMonth: number
    birthYear: number
    nationality: number
    ethnicity: number
    weight: number
    height: number
    bodyType: number
    skinColor: number
    behavior: number
    distinguishingMarks: number
    address: number
    occupation: number
    workplaceAddress: number
    father: number
    mother: number
    spouse: number
    fingerprintDate: number
    purpose: number
    requestingAgency: number
    receiptBookNo: number
    receiptNo: number
    receiptDate: number
    money: number
    moneyText: number
    status: number
    statusUpdatedAt: number
    deleteAt: number
    organizationId: number
    organizationName: number
    fullNameOrg: number
    rank: number
    position: number
    fullNameWithRank: number
    priority: number
    returnDate: number
    _all: number
  }


  export type PersonAvgAggregateInputType = {
    weight?: true
    height?: true
    money?: true
    status?: true
    priority?: true
  }

  export type PersonSumAggregateInputType = {
    weight?: true
    height?: true
    money?: true
    status?: true
    priority?: true
  }

  export type PersonMinAggregateInputType = {
    personId?: true
    createdAt?: true
    updatedAt?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    citizenId?: true
    birthDate?: true
    birthDay?: true
    birthMonth?: true
    birthYear?: true
    nationality?: true
    ethnicity?: true
    weight?: true
    height?: true
    bodyType?: true
    skinColor?: true
    behavior?: true
    distinguishingMarks?: true
    address?: true
    occupation?: true
    workplaceAddress?: true
    father?: true
    mother?: true
    spouse?: true
    fingerprintDate?: true
    purpose?: true
    requestingAgency?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    money?: true
    moneyText?: true
    status?: true
    statusUpdatedAt?: true
    deleteAt?: true
    organizationId?: true
    organizationName?: true
    fullNameOrg?: true
    rank?: true
    position?: true
    fullNameWithRank?: true
    priority?: true
    returnDate?: true
  }

  export type PersonMaxAggregateInputType = {
    personId?: true
    createdAt?: true
    updatedAt?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    citizenId?: true
    birthDate?: true
    birthDay?: true
    birthMonth?: true
    birthYear?: true
    nationality?: true
    ethnicity?: true
    weight?: true
    height?: true
    bodyType?: true
    skinColor?: true
    behavior?: true
    distinguishingMarks?: true
    address?: true
    occupation?: true
    workplaceAddress?: true
    father?: true
    mother?: true
    spouse?: true
    fingerprintDate?: true
    purpose?: true
    requestingAgency?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    money?: true
    moneyText?: true
    status?: true
    statusUpdatedAt?: true
    deleteAt?: true
    organizationId?: true
    organizationName?: true
    fullNameOrg?: true
    rank?: true
    position?: true
    fullNameWithRank?: true
    priority?: true
    returnDate?: true
  }

  export type PersonCountAggregateInputType = {
    personId?: true
    createdAt?: true
    updatedAt?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    citizenId?: true
    birthDate?: true
    birthDay?: true
    birthMonth?: true
    birthYear?: true
    nationality?: true
    ethnicity?: true
    weight?: true
    height?: true
    bodyType?: true
    skinColor?: true
    behavior?: true
    distinguishingMarks?: true
    address?: true
    occupation?: true
    workplaceAddress?: true
    father?: true
    mother?: true
    spouse?: true
    fingerprintDate?: true
    purpose?: true
    requestingAgency?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    money?: true
    moneyText?: true
    status?: true
    statusUpdatedAt?: true
    deleteAt?: true
    organizationId?: true
    organizationName?: true
    fullNameOrg?: true
    rank?: true
    position?: true
    fullNameWithRank?: true
    priority?: true
    returnDate?: true
    _all?: true
  }

  export type PersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }




  export type PersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithAggregationInput | PersonOrderByWithAggregationInput[]
    by: PersonScalarFieldEnum[] | PersonScalarFieldEnum
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _avg?: PersonAvgAggregateInputType
    _sum?: PersonSumAggregateInputType
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }

  export type PersonGroupByOutputType = {
    personId: string
    createdAt: Date
    updatedAt: Date | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate: string | null
    birthDay: string | null
    birthMonth: string | null
    birthYear: string | null
    nationality: string | null
    ethnicity: string | null
    weight: number | null
    height: number | null
    bodyType: string | null
    skinColor: string | null
    behavior: string | null
    distinguishingMarks: string | null
    address: string | null
    occupation: string | null
    workplaceAddress: string | null
    father: string | null
    mother: string | null
    spouse: string | null
    fingerprintDate: string | null
    purpose: string | null
    requestingAgency: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    money: number
    moneyText: string | null
    status: number
    statusUpdatedAt: Date | null
    deleteAt: Date | null
    organizationId: string | null
    organizationName: string | null
    fullNameOrg: string | null
    rank: string | null
    position: string | null
    fullNameWithRank: string | null
    priority: number
    returnDate: Date | null
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonGroupByOutputType[P]>
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      >
    >


  export type PersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    personId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    citizenId?: boolean
    birthDate?: boolean
    birthDay?: boolean
    birthMonth?: boolean
    birthYear?: boolean
    nationality?: boolean
    ethnicity?: boolean
    weight?: boolean
    height?: boolean
    bodyType?: boolean
    skinColor?: boolean
    behavior?: boolean
    distinguishingMarks?: boolean
    address?: boolean
    occupation?: boolean
    workplaceAddress?: boolean
    father?: boolean
    mother?: boolean
    spouse?: boolean
    fingerprintDate?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    deleteAt?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    priority?: boolean
    returnDate?: boolean
    organization?: boolean | Person$organizationArgs<ExtArgs>
    receipts?: boolean | Person$receiptsArgs<ExtArgs>
    requestInfos?: boolean | Person$requestInfosArgs<ExtArgs>
    statusHistories?: boolean | Person$statusHistoriesArgs<ExtArgs>
    forensicSubmissionPersons?: boolean | Person$forensicSubmissionPersonsArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    personId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    citizenId?: boolean
    birthDate?: boolean
    birthDay?: boolean
    birthMonth?: boolean
    birthYear?: boolean
    nationality?: boolean
    ethnicity?: boolean
    weight?: boolean
    height?: boolean
    bodyType?: boolean
    skinColor?: boolean
    behavior?: boolean
    distinguishingMarks?: boolean
    address?: boolean
    occupation?: boolean
    workplaceAddress?: boolean
    father?: boolean
    mother?: boolean
    spouse?: boolean
    fingerprintDate?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    deleteAt?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    priority?: boolean
    returnDate?: boolean
    organization?: boolean | Person$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    personId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    citizenId?: boolean
    birthDate?: boolean
    birthDay?: boolean
    birthMonth?: boolean
    birthYear?: boolean
    nationality?: boolean
    ethnicity?: boolean
    weight?: boolean
    height?: boolean
    bodyType?: boolean
    skinColor?: boolean
    behavior?: boolean
    distinguishingMarks?: boolean
    address?: boolean
    occupation?: boolean
    workplaceAddress?: boolean
    father?: boolean
    mother?: boolean
    spouse?: boolean
    fingerprintDate?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    deleteAt?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    priority?: boolean
    returnDate?: boolean
    organization?: boolean | Person$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectScalar = {
    personId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    citizenId?: boolean
    birthDate?: boolean
    birthDay?: boolean
    birthMonth?: boolean
    birthYear?: boolean
    nationality?: boolean
    ethnicity?: boolean
    weight?: boolean
    height?: boolean
    bodyType?: boolean
    skinColor?: boolean
    behavior?: boolean
    distinguishingMarks?: boolean
    address?: boolean
    occupation?: boolean
    workplaceAddress?: boolean
    father?: boolean
    mother?: boolean
    spouse?: boolean
    fingerprintDate?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    deleteAt?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    priority?: boolean
    returnDate?: boolean
  }

  export type PersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"personId" | "createdAt" | "updatedAt" | "prefix" | "firstName" | "lastName" | "fullName" | "citizenId" | "birthDate" | "birthDay" | "birthMonth" | "birthYear" | "nationality" | "ethnicity" | "weight" | "height" | "bodyType" | "skinColor" | "behavior" | "distinguishingMarks" | "address" | "occupation" | "workplaceAddress" | "father" | "mother" | "spouse" | "fingerprintDate" | "purpose" | "requestingAgency" | "receiptBookNo" | "receiptNo" | "receiptDate" | "money" | "moneyText" | "status" | "statusUpdatedAt" | "deleteAt" | "organizationId" | "organizationName" | "fullNameOrg" | "rank" | "position" | "fullNameWithRank" | "priority" | "returnDate", ExtArgs["result"]["person"]>
  export type PersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Person$organizationArgs<ExtArgs>
    receipts?: boolean | Person$receiptsArgs<ExtArgs>
    requestInfos?: boolean | Person$requestInfosArgs<ExtArgs>
    statusHistories?: boolean | Person$statusHistoriesArgs<ExtArgs>
    forensicSubmissionPersons?: boolean | Person$forensicSubmissionPersonsArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Person$organizationArgs<ExtArgs>
  }
  export type PersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Person$organizationArgs<ExtArgs>
  }

  export type $PersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Person"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      receipts: Prisma.$ReceiptPayload<ExtArgs>[]
      requestInfos: Prisma.$RequestInfoPayload<ExtArgs>[]
      statusHistories: Prisma.$PersonStatusHistoryPayload<ExtArgs>[]
      forensicSubmissionPersons: Prisma.$ForensicSubmissionPersonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      personId: string
      createdAt: Date
      updatedAt: Date | null
      prefix: string
      firstName: string
      lastName: string
      fullName: string
      citizenId: string
      birthDate: string | null
      birthDay: string | null
      birthMonth: string | null
      birthYear: string | null
      nationality: string | null
      ethnicity: string | null
      weight: number | null
      height: number | null
      bodyType: string | null
      skinColor: string | null
      behavior: string | null
      distinguishingMarks: string | null
      address: string | null
      occupation: string | null
      workplaceAddress: string | null
      father: string | null
      mother: string | null
      spouse: string | null
      fingerprintDate: string | null
      purpose: string | null
      requestingAgency: string | null
      receiptBookNo: string | null
      receiptNo: string | null
      receiptDate: string | null
      money: number
      moneyText: string | null
      status: number
      statusUpdatedAt: Date | null
      deleteAt: Date | null
      organizationId: string | null
      organizationName: string | null
      fullNameOrg: string | null
      rank: string | null
      position: string | null
      fullNameWithRank: string | null
      priority: number
      returnDate: Date | null
    }, ExtArgs["result"]["person"]>
    composites: {}
  }

  type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = $Result.GetResult<Prisma.$PersonPayload, S>

  type PersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonCountAggregateInputType | true
    }

  export interface PersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Person'], meta: { name: 'Person' } }
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `personId`
     * const personWithPersonIdOnly = await prisma.person.findMany({ select: { personId: true } })
     * 
     */
    findMany<T extends PersonFindManyArgs>(args?: SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
     */
    create<T extends PersonCreateArgs>(args: SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonCreateManyArgs>(args?: SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `personId`
     * const personWithPersonIdOnly = await prisma.person.createManyAndReturn({
     *   select: { personId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
     */
    delete<T extends PersonDeleteArgs>(args: SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonUpdateArgs>(args: SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonUpdateManyArgs>(args: SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `personId`
     * const personWithPersonIdOnly = await prisma.person.updateManyAndReturn({
     *   select: { personId: true },
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
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
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
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Person model
   */
  readonly fields: PersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends Person$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Person$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    receipts<T extends Person$receiptsArgs<ExtArgs> = {}>(args?: Subset<T, Person$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    requestInfos<T extends Person$requestInfosArgs<ExtArgs> = {}>(args?: Subset<T, Person$requestInfosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusHistories<T extends Person$statusHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, Person$statusHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    forensicSubmissionPersons<T extends Person$forensicSubmissionPersonsArgs<ExtArgs> = {}>(args?: Subset<T, Person$forensicSubmissionPersonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Person model
   */
  interface PersonFieldRefs {
    readonly personId: FieldRef<"Person", 'String'>
    readonly createdAt: FieldRef<"Person", 'DateTime'>
    readonly updatedAt: FieldRef<"Person", 'DateTime'>
    readonly prefix: FieldRef<"Person", 'String'>
    readonly firstName: FieldRef<"Person", 'String'>
    readonly lastName: FieldRef<"Person", 'String'>
    readonly fullName: FieldRef<"Person", 'String'>
    readonly citizenId: FieldRef<"Person", 'String'>
    readonly birthDate: FieldRef<"Person", 'String'>
    readonly birthDay: FieldRef<"Person", 'String'>
    readonly birthMonth: FieldRef<"Person", 'String'>
    readonly birthYear: FieldRef<"Person", 'String'>
    readonly nationality: FieldRef<"Person", 'String'>
    readonly ethnicity: FieldRef<"Person", 'String'>
    readonly weight: FieldRef<"Person", 'Int'>
    readonly height: FieldRef<"Person", 'Int'>
    readonly bodyType: FieldRef<"Person", 'String'>
    readonly skinColor: FieldRef<"Person", 'String'>
    readonly behavior: FieldRef<"Person", 'String'>
    readonly distinguishingMarks: FieldRef<"Person", 'String'>
    readonly address: FieldRef<"Person", 'String'>
    readonly occupation: FieldRef<"Person", 'String'>
    readonly workplaceAddress: FieldRef<"Person", 'String'>
    readonly father: FieldRef<"Person", 'String'>
    readonly mother: FieldRef<"Person", 'String'>
    readonly spouse: FieldRef<"Person", 'String'>
    readonly fingerprintDate: FieldRef<"Person", 'String'>
    readonly purpose: FieldRef<"Person", 'String'>
    readonly requestingAgency: FieldRef<"Person", 'String'>
    readonly receiptBookNo: FieldRef<"Person", 'String'>
    readonly receiptNo: FieldRef<"Person", 'String'>
    readonly receiptDate: FieldRef<"Person", 'String'>
    readonly money: FieldRef<"Person", 'Int'>
    readonly moneyText: FieldRef<"Person", 'String'>
    readonly status: FieldRef<"Person", 'Int'>
    readonly statusUpdatedAt: FieldRef<"Person", 'DateTime'>
    readonly deleteAt: FieldRef<"Person", 'DateTime'>
    readonly organizationId: FieldRef<"Person", 'String'>
    readonly organizationName: FieldRef<"Person", 'String'>
    readonly fullNameOrg: FieldRef<"Person", 'String'>
    readonly rank: FieldRef<"Person", 'String'>
    readonly position: FieldRef<"Person", 'String'>
    readonly fullNameWithRank: FieldRef<"Person", 'String'>
    readonly priority: FieldRef<"Person", 'Int'>
    readonly returnDate: FieldRef<"Person", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findUniqueOrThrow
   */
  export type PersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findFirstOrThrow
   */
  export type PersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findMany
   */
  export type PersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person create
   */
  export type PersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to create a Person.
     */
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }

  /**
   * Person createMany
   */
  export type PersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person createManyAndReturn
   */
  export type PersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Person update
   */
  export type PersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to update a Person.
     */
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person updateManyAndReturn
   */
  export type PersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Person upsert
   */
  export type PersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }

  /**
   * Person delete
   */
  export type PersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter which Person to delete.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * Person.organization
   */
  export type Person$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Person.receipts
   */
  export type Person$receiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    cursor?: ReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Person.requestInfos
   */
  export type Person$requestInfosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    where?: RequestInfoWhereInput
    orderBy?: RequestInfoOrderByWithRelationInput | RequestInfoOrderByWithRelationInput[]
    cursor?: RequestInfoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestInfoScalarFieldEnum | RequestInfoScalarFieldEnum[]
  }

  /**
   * Person.statusHistories
   */
  export type Person$statusHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    where?: PersonStatusHistoryWhereInput
    orderBy?: PersonStatusHistoryOrderByWithRelationInput | PersonStatusHistoryOrderByWithRelationInput[]
    cursor?: PersonStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonStatusHistoryScalarFieldEnum | PersonStatusHistoryScalarFieldEnum[]
  }

  /**
   * Person.forensicSubmissionPersons
   */
  export type Person$forensicSubmissionPersonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    where?: ForensicSubmissionPersonWhereInput
    orderBy?: ForensicSubmissionPersonOrderByWithRelationInput | ForensicSubmissionPersonOrderByWithRelationInput[]
    cursor?: ForensicSubmissionPersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForensicSubmissionPersonScalarFieldEnum | ForensicSubmissionPersonScalarFieldEnum[]
  }

  /**
   * Person without action
   */
  export type PersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
  }


  /**
   * Model PersonStatusHistory
   */

  export type AggregatePersonStatusHistory = {
    _count: PersonStatusHistoryCountAggregateOutputType | null
    _avg: PersonStatusHistoryAvgAggregateOutputType | null
    _sum: PersonStatusHistorySumAggregateOutputType | null
    _min: PersonStatusHistoryMinAggregateOutputType | null
    _max: PersonStatusHistoryMaxAggregateOutputType | null
  }

  export type PersonStatusHistoryAvgAggregateOutputType = {
    oldStatus: number | null
    newStatus: number | null
  }

  export type PersonStatusHistorySumAggregateOutputType = {
    oldStatus: number | null
    newStatus: number | null
  }

  export type PersonStatusHistoryMinAggregateOutputType = {
    historyId: string | null
    personId: string | null
    oldStatus: number | null
    newStatus: number | null
    changedAt: Date | null
  }

  export type PersonStatusHistoryMaxAggregateOutputType = {
    historyId: string | null
    personId: string | null
    oldStatus: number | null
    newStatus: number | null
    changedAt: Date | null
  }

  export type PersonStatusHistoryCountAggregateOutputType = {
    historyId: number
    personId: number
    oldStatus: number
    newStatus: number
    changedAt: number
    _all: number
  }


  export type PersonStatusHistoryAvgAggregateInputType = {
    oldStatus?: true
    newStatus?: true
  }

  export type PersonStatusHistorySumAggregateInputType = {
    oldStatus?: true
    newStatus?: true
  }

  export type PersonStatusHistoryMinAggregateInputType = {
    historyId?: true
    personId?: true
    oldStatus?: true
    newStatus?: true
    changedAt?: true
  }

  export type PersonStatusHistoryMaxAggregateInputType = {
    historyId?: true
    personId?: true
    oldStatus?: true
    newStatus?: true
    changedAt?: true
  }

  export type PersonStatusHistoryCountAggregateInputType = {
    historyId?: true
    personId?: true
    oldStatus?: true
    newStatus?: true
    changedAt?: true
    _all?: true
  }

  export type PersonStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonStatusHistory to aggregate.
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonStatusHistories to fetch.
     */
    orderBy?: PersonStatusHistoryOrderByWithRelationInput | PersonStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonStatusHistories
    **/
    _count?: true | PersonStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonStatusHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonStatusHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonStatusHistoryMaxAggregateInputType
  }

  export type GetPersonStatusHistoryAggregateType<T extends PersonStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonStatusHistory[P]>
      : GetScalarType<T[P], AggregatePersonStatusHistory[P]>
  }




  export type PersonStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonStatusHistoryWhereInput
    orderBy?: PersonStatusHistoryOrderByWithAggregationInput | PersonStatusHistoryOrderByWithAggregationInput[]
    by: PersonStatusHistoryScalarFieldEnum[] | PersonStatusHistoryScalarFieldEnum
    having?: PersonStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonStatusHistoryCountAggregateInputType | true
    _avg?: PersonStatusHistoryAvgAggregateInputType
    _sum?: PersonStatusHistorySumAggregateInputType
    _min?: PersonStatusHistoryMinAggregateInputType
    _max?: PersonStatusHistoryMaxAggregateInputType
  }

  export type PersonStatusHistoryGroupByOutputType = {
    historyId: string
    personId: string
    oldStatus: number
    newStatus: number
    changedAt: Date
    _count: PersonStatusHistoryCountAggregateOutputType | null
    _avg: PersonStatusHistoryAvgAggregateOutputType | null
    _sum: PersonStatusHistorySumAggregateOutputType | null
    _min: PersonStatusHistoryMinAggregateOutputType | null
    _max: PersonStatusHistoryMaxAggregateOutputType | null
  }

  type GetPersonStatusHistoryGroupByPayload<T extends PersonStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PersonStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PersonStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    personId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    changedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personStatusHistory"]>

  export type PersonStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    personId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    changedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personStatusHistory"]>

  export type PersonStatusHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    personId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    changedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personStatusHistory"]>

  export type PersonStatusHistorySelectScalar = {
    historyId?: boolean
    personId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    changedAt?: boolean
  }

  export type PersonStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"historyId" | "personId" | "oldStatus" | "newStatus" | "changedAt", ExtArgs["result"]["personStatusHistory"]>
  export type PersonStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type PersonStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type PersonStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $PersonStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonStatusHistory"
    objects: {
      person: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      historyId: string
      personId: string
      oldStatus: number
      newStatus: number
      changedAt: Date
    }, ExtArgs["result"]["personStatusHistory"]>
    composites: {}
  }

  type PersonStatusHistoryGetPayload<S extends boolean | null | undefined | PersonStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$PersonStatusHistoryPayload, S>

  type PersonStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonStatusHistoryCountAggregateInputType | true
    }

  export interface PersonStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonStatusHistory'], meta: { name: 'PersonStatusHistory' } }
    /**
     * Find zero or one PersonStatusHistory that matches the filter.
     * @param {PersonStatusHistoryFindUniqueArgs} args - Arguments to find a PersonStatusHistory
     * @example
     * // Get one PersonStatusHistory
     * const personStatusHistory = await prisma.personStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonStatusHistoryFindUniqueArgs>(args: SelectSubset<T, PersonStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a PersonStatusHistory
     * @example
     * // Get one PersonStatusHistory
     * const personStatusHistory = await prisma.personStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryFindFirstArgs} args - Arguments to find a PersonStatusHistory
     * @example
     * // Get one PersonStatusHistory
     * const personStatusHistory = await prisma.personStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonStatusHistoryFindFirstArgs>(args?: SelectSubset<T, PersonStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a PersonStatusHistory
     * @example
     * // Get one PersonStatusHistory
     * const personStatusHistory = await prisma.personStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonStatusHistories
     * const personStatusHistories = await prisma.personStatusHistory.findMany()
     * 
     * // Get first 10 PersonStatusHistories
     * const personStatusHistories = await prisma.personStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `historyId`
     * const personStatusHistoryWithHistoryIdOnly = await prisma.personStatusHistory.findMany({ select: { historyId: true } })
     * 
     */
    findMany<T extends PersonStatusHistoryFindManyArgs>(args?: SelectSubset<T, PersonStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonStatusHistory.
     * @param {PersonStatusHistoryCreateArgs} args - Arguments to create a PersonStatusHistory.
     * @example
     * // Create one PersonStatusHistory
     * const PersonStatusHistory = await prisma.personStatusHistory.create({
     *   data: {
     *     // ... data to create a PersonStatusHistory
     *   }
     * })
     * 
     */
    create<T extends PersonStatusHistoryCreateArgs>(args: SelectSubset<T, PersonStatusHistoryCreateArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonStatusHistories.
     * @param {PersonStatusHistoryCreateManyArgs} args - Arguments to create many PersonStatusHistories.
     * @example
     * // Create many PersonStatusHistories
     * const personStatusHistory = await prisma.personStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonStatusHistoryCreateManyArgs>(args?: SelectSubset<T, PersonStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonStatusHistories and returns the data saved in the database.
     * @param {PersonStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many PersonStatusHistories.
     * @example
     * // Create many PersonStatusHistories
     * const personStatusHistory = await prisma.personStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonStatusHistories and only return the `historyId`
     * const personStatusHistoryWithHistoryIdOnly = await prisma.personStatusHistory.createManyAndReturn({
     *   select: { historyId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonStatusHistory.
     * @param {PersonStatusHistoryDeleteArgs} args - Arguments to delete one PersonStatusHistory.
     * @example
     * // Delete one PersonStatusHistory
     * const PersonStatusHistory = await prisma.personStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one PersonStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends PersonStatusHistoryDeleteArgs>(args: SelectSubset<T, PersonStatusHistoryDeleteArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonStatusHistory.
     * @param {PersonStatusHistoryUpdateArgs} args - Arguments to update one PersonStatusHistory.
     * @example
     * // Update one PersonStatusHistory
     * const personStatusHistory = await prisma.personStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonStatusHistoryUpdateArgs>(args: SelectSubset<T, PersonStatusHistoryUpdateArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonStatusHistories.
     * @param {PersonStatusHistoryDeleteManyArgs} args - Arguments to filter PersonStatusHistories to delete.
     * @example
     * // Delete a few PersonStatusHistories
     * const { count } = await prisma.personStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, PersonStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonStatusHistories
     * const personStatusHistory = await prisma.personStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonStatusHistoryUpdateManyArgs>(args: SelectSubset<T, PersonStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonStatusHistories and returns the data updated in the database.
     * @param {PersonStatusHistoryUpdateManyAndReturnArgs} args - Arguments to update many PersonStatusHistories.
     * @example
     * // Update many PersonStatusHistories
     * const personStatusHistory = await prisma.personStatusHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonStatusHistories and only return the `historyId`
     * const personStatusHistoryWithHistoryIdOnly = await prisma.personStatusHistory.updateManyAndReturn({
     *   select: { historyId: true },
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
    updateManyAndReturn<T extends PersonStatusHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonStatusHistory.
     * @param {PersonStatusHistoryUpsertArgs} args - Arguments to update or create a PersonStatusHistory.
     * @example
     * // Update or create a PersonStatusHistory
     * const personStatusHistory = await prisma.personStatusHistory.upsert({
     *   create: {
     *     // ... data to create a PersonStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends PersonStatusHistoryUpsertArgs>(args: SelectSubset<T, PersonStatusHistoryUpsertArgs<ExtArgs>>): Prisma__PersonStatusHistoryClient<$Result.GetResult<Prisma.$PersonStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryCountArgs} args - Arguments to filter PersonStatusHistories to count.
     * @example
     * // Count the number of PersonStatusHistories
     * const count = await prisma.personStatusHistory.count({
     *   where: {
     *     // ... the filter for the PersonStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends PersonStatusHistoryCountArgs>(
      args?: Subset<T, PersonStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonStatusHistoryAggregateArgs>(args: Subset<T, PersonStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetPersonStatusHistoryAggregateType<T>>

    /**
     * Group by PersonStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends PersonStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PersonStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PersonStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonStatusHistory model
   */
  readonly fields: PersonStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PersonStatusHistory model
   */
  interface PersonStatusHistoryFieldRefs {
    readonly historyId: FieldRef<"PersonStatusHistory", 'String'>
    readonly personId: FieldRef<"PersonStatusHistory", 'String'>
    readonly oldStatus: FieldRef<"PersonStatusHistory", 'Int'>
    readonly newStatus: FieldRef<"PersonStatusHistory", 'Int'>
    readonly changedAt: FieldRef<"PersonStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PersonStatusHistory findUnique
   */
  export type PersonStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PersonStatusHistory to fetch.
     */
    where: PersonStatusHistoryWhereUniqueInput
  }

  /**
   * PersonStatusHistory findUniqueOrThrow
   */
  export type PersonStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PersonStatusHistory to fetch.
     */
    where: PersonStatusHistoryWhereUniqueInput
  }

  /**
   * PersonStatusHistory findFirst
   */
  export type PersonStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PersonStatusHistory to fetch.
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonStatusHistories to fetch.
     */
    orderBy?: PersonStatusHistoryOrderByWithRelationInput | PersonStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonStatusHistories.
     */
    cursor?: PersonStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonStatusHistories.
     */
    distinct?: PersonStatusHistoryScalarFieldEnum | PersonStatusHistoryScalarFieldEnum[]
  }

  /**
   * PersonStatusHistory findFirstOrThrow
   */
  export type PersonStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PersonStatusHistory to fetch.
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonStatusHistories to fetch.
     */
    orderBy?: PersonStatusHistoryOrderByWithRelationInput | PersonStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonStatusHistories.
     */
    cursor?: PersonStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonStatusHistories.
     */
    distinct?: PersonStatusHistoryScalarFieldEnum | PersonStatusHistoryScalarFieldEnum[]
  }

  /**
   * PersonStatusHistory findMany
   */
  export type PersonStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PersonStatusHistories to fetch.
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonStatusHistories to fetch.
     */
    orderBy?: PersonStatusHistoryOrderByWithRelationInput | PersonStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonStatusHistories.
     */
    cursor?: PersonStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonStatusHistories.
     */
    distinct?: PersonStatusHistoryScalarFieldEnum | PersonStatusHistoryScalarFieldEnum[]
  }

  /**
   * PersonStatusHistory create
   */
  export type PersonStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PersonStatusHistory.
     */
    data: XOR<PersonStatusHistoryCreateInput, PersonStatusHistoryUncheckedCreateInput>
  }

  /**
   * PersonStatusHistory createMany
   */
  export type PersonStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonStatusHistories.
     */
    data: PersonStatusHistoryCreateManyInput | PersonStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonStatusHistory createManyAndReturn
   */
  export type PersonStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many PersonStatusHistories.
     */
    data: PersonStatusHistoryCreateManyInput | PersonStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonStatusHistory update
   */
  export type PersonStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PersonStatusHistory.
     */
    data: XOR<PersonStatusHistoryUpdateInput, PersonStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which PersonStatusHistory to update.
     */
    where: PersonStatusHistoryWhereUniqueInput
  }

  /**
   * PersonStatusHistory updateMany
   */
  export type PersonStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonStatusHistories.
     */
    data: XOR<PersonStatusHistoryUpdateManyMutationInput, PersonStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PersonStatusHistories to update
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * Limit how many PersonStatusHistories to update.
     */
    limit?: number
  }

  /**
   * PersonStatusHistory updateManyAndReturn
   */
  export type PersonStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to update PersonStatusHistories.
     */
    data: XOR<PersonStatusHistoryUpdateManyMutationInput, PersonStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PersonStatusHistories to update
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * Limit how many PersonStatusHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonStatusHistory upsert
   */
  export type PersonStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PersonStatusHistory to update in case it exists.
     */
    where: PersonStatusHistoryWhereUniqueInput
    /**
     * In case the PersonStatusHistory found by the `where` argument doesn't exist, create a new PersonStatusHistory with this data.
     */
    create: XOR<PersonStatusHistoryCreateInput, PersonStatusHistoryUncheckedCreateInput>
    /**
     * In case the PersonStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonStatusHistoryUpdateInput, PersonStatusHistoryUncheckedUpdateInput>
  }

  /**
   * PersonStatusHistory delete
   */
  export type PersonStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which PersonStatusHistory to delete.
     */
    where: PersonStatusHistoryWhereUniqueInput
  }

  /**
   * PersonStatusHistory deleteMany
   */
  export type PersonStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonStatusHistories to delete
     */
    where?: PersonStatusHistoryWhereInput
    /**
     * Limit how many PersonStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * PersonStatusHistory without action
   */
  export type PersonStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonStatusHistory
     */
    select?: PersonStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonStatusHistory
     */
    omit?: PersonStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model RequestInfo
   */

  export type AggregateRequestInfo = {
    _count: RequestInfoCountAggregateOutputType | null
    _min: RequestInfoMinAggregateOutputType | null
    _max: RequestInfoMaxAggregateOutputType | null
  }

  export type RequestInfoMinAggregateOutputType = {
    requestInfoId: string | null
    personId: string | null
    purpose: string | null
    requestingAgency: string | null
    createdAt: Date | null
  }

  export type RequestInfoMaxAggregateOutputType = {
    requestInfoId: string | null
    personId: string | null
    purpose: string | null
    requestingAgency: string | null
    createdAt: Date | null
  }

  export type RequestInfoCountAggregateOutputType = {
    requestInfoId: number
    personId: number
    purpose: number
    requestingAgency: number
    createdAt: number
    _all: number
  }


  export type RequestInfoMinAggregateInputType = {
    requestInfoId?: true
    personId?: true
    purpose?: true
    requestingAgency?: true
    createdAt?: true
  }

  export type RequestInfoMaxAggregateInputType = {
    requestInfoId?: true
    personId?: true
    purpose?: true
    requestingAgency?: true
    createdAt?: true
  }

  export type RequestInfoCountAggregateInputType = {
    requestInfoId?: true
    personId?: true
    purpose?: true
    requestingAgency?: true
    createdAt?: true
    _all?: true
  }

  export type RequestInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestInfo to aggregate.
     */
    where?: RequestInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestInfos to fetch.
     */
    orderBy?: RequestInfoOrderByWithRelationInput | RequestInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestInfos
    **/
    _count?: true | RequestInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestInfoMaxAggregateInputType
  }

  export type GetRequestInfoAggregateType<T extends RequestInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestInfo[P]>
      : GetScalarType<T[P], AggregateRequestInfo[P]>
  }




  export type RequestInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestInfoWhereInput
    orderBy?: RequestInfoOrderByWithAggregationInput | RequestInfoOrderByWithAggregationInput[]
    by: RequestInfoScalarFieldEnum[] | RequestInfoScalarFieldEnum
    having?: RequestInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestInfoCountAggregateInputType | true
    _min?: RequestInfoMinAggregateInputType
    _max?: RequestInfoMaxAggregateInputType
  }

  export type RequestInfoGroupByOutputType = {
    requestInfoId: string
    personId: string
    purpose: string | null
    requestingAgency: string | null
    createdAt: Date
    _count: RequestInfoCountAggregateOutputType | null
    _min: RequestInfoMinAggregateOutputType | null
    _max: RequestInfoMaxAggregateOutputType | null
  }

  type GetRequestInfoGroupByPayload<T extends RequestInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestInfoGroupByOutputType[P]>
            : GetScalarType<T[P], RequestInfoGroupByOutputType[P]>
        }
      >
    >


  export type RequestInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    requestInfoId?: boolean
    personId?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    createdAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestInfo"]>

  export type RequestInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    requestInfoId?: boolean
    personId?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    createdAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestInfo"]>

  export type RequestInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    requestInfoId?: boolean
    personId?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    createdAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestInfo"]>

  export type RequestInfoSelectScalar = {
    requestInfoId?: boolean
    personId?: boolean
    purpose?: boolean
    requestingAgency?: boolean
    createdAt?: boolean
  }

  export type RequestInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"requestInfoId" | "personId" | "purpose" | "requestingAgency" | "createdAt", ExtArgs["result"]["requestInfo"]>
  export type RequestInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type RequestInfoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type RequestInfoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $RequestInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestInfo"
    objects: {
      person: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      requestInfoId: string
      personId: string
      purpose: string | null
      requestingAgency: string | null
      createdAt: Date
    }, ExtArgs["result"]["requestInfo"]>
    composites: {}
  }

  type RequestInfoGetPayload<S extends boolean | null | undefined | RequestInfoDefaultArgs> = $Result.GetResult<Prisma.$RequestInfoPayload, S>

  type RequestInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestInfoCountAggregateInputType | true
    }

  export interface RequestInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestInfo'], meta: { name: 'RequestInfo' } }
    /**
     * Find zero or one RequestInfo that matches the filter.
     * @param {RequestInfoFindUniqueArgs} args - Arguments to find a RequestInfo
     * @example
     * // Get one RequestInfo
     * const requestInfo = await prisma.requestInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestInfoFindUniqueArgs>(args: SelectSubset<T, RequestInfoFindUniqueArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestInfoFindUniqueOrThrowArgs} args - Arguments to find a RequestInfo
     * @example
     * // Get one RequestInfo
     * const requestInfo = await prisma.requestInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoFindFirstArgs} args - Arguments to find a RequestInfo
     * @example
     * // Get one RequestInfo
     * const requestInfo = await prisma.requestInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestInfoFindFirstArgs>(args?: SelectSubset<T, RequestInfoFindFirstArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoFindFirstOrThrowArgs} args - Arguments to find a RequestInfo
     * @example
     * // Get one RequestInfo
     * const requestInfo = await prisma.requestInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestInfos
     * const requestInfos = await prisma.requestInfo.findMany()
     * 
     * // Get first 10 RequestInfos
     * const requestInfos = await prisma.requestInfo.findMany({ take: 10 })
     * 
     * // Only select the `requestInfoId`
     * const requestInfoWithRequestInfoIdOnly = await prisma.requestInfo.findMany({ select: { requestInfoId: true } })
     * 
     */
    findMany<T extends RequestInfoFindManyArgs>(args?: SelectSubset<T, RequestInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestInfo.
     * @param {RequestInfoCreateArgs} args - Arguments to create a RequestInfo.
     * @example
     * // Create one RequestInfo
     * const RequestInfo = await prisma.requestInfo.create({
     *   data: {
     *     // ... data to create a RequestInfo
     *   }
     * })
     * 
     */
    create<T extends RequestInfoCreateArgs>(args: SelectSubset<T, RequestInfoCreateArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestInfos.
     * @param {RequestInfoCreateManyArgs} args - Arguments to create many RequestInfos.
     * @example
     * // Create many RequestInfos
     * const requestInfo = await prisma.requestInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestInfoCreateManyArgs>(args?: SelectSubset<T, RequestInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestInfos and returns the data saved in the database.
     * @param {RequestInfoCreateManyAndReturnArgs} args - Arguments to create many RequestInfos.
     * @example
     * // Create many RequestInfos
     * const requestInfo = await prisma.requestInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestInfos and only return the `requestInfoId`
     * const requestInfoWithRequestInfoIdOnly = await prisma.requestInfo.createManyAndReturn({
     *   select: { requestInfoId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestInfo.
     * @param {RequestInfoDeleteArgs} args - Arguments to delete one RequestInfo.
     * @example
     * // Delete one RequestInfo
     * const RequestInfo = await prisma.requestInfo.delete({
     *   where: {
     *     // ... filter to delete one RequestInfo
     *   }
     * })
     * 
     */
    delete<T extends RequestInfoDeleteArgs>(args: SelectSubset<T, RequestInfoDeleteArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestInfo.
     * @param {RequestInfoUpdateArgs} args - Arguments to update one RequestInfo.
     * @example
     * // Update one RequestInfo
     * const requestInfo = await prisma.requestInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestInfoUpdateArgs>(args: SelectSubset<T, RequestInfoUpdateArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestInfos.
     * @param {RequestInfoDeleteManyArgs} args - Arguments to filter RequestInfos to delete.
     * @example
     * // Delete a few RequestInfos
     * const { count } = await prisma.requestInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestInfoDeleteManyArgs>(args?: SelectSubset<T, RequestInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestInfos
     * const requestInfo = await prisma.requestInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestInfoUpdateManyArgs>(args: SelectSubset<T, RequestInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestInfos and returns the data updated in the database.
     * @param {RequestInfoUpdateManyAndReturnArgs} args - Arguments to update many RequestInfos.
     * @example
     * // Update many RequestInfos
     * const requestInfo = await prisma.requestInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestInfos and only return the `requestInfoId`
     * const requestInfoWithRequestInfoIdOnly = await prisma.requestInfo.updateManyAndReturn({
     *   select: { requestInfoId: true },
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
    updateManyAndReturn<T extends RequestInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestInfo.
     * @param {RequestInfoUpsertArgs} args - Arguments to update or create a RequestInfo.
     * @example
     * // Update or create a RequestInfo
     * const requestInfo = await prisma.requestInfo.upsert({
     *   create: {
     *     // ... data to create a RequestInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestInfo we want to update
     *   }
     * })
     */
    upsert<T extends RequestInfoUpsertArgs>(args: SelectSubset<T, RequestInfoUpsertArgs<ExtArgs>>): Prisma__RequestInfoClient<$Result.GetResult<Prisma.$RequestInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoCountArgs} args - Arguments to filter RequestInfos to count.
     * @example
     * // Count the number of RequestInfos
     * const count = await prisma.requestInfo.count({
     *   where: {
     *     // ... the filter for the RequestInfos we want to count
     *   }
     * })
    **/
    count<T extends RequestInfoCountArgs>(
      args?: Subset<T, RequestInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RequestInfoAggregateArgs>(args: Subset<T, RequestInfoAggregateArgs>): Prisma.PrismaPromise<GetRequestInfoAggregateType<T>>

    /**
     * Group by RequestInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestInfoGroupByArgs} args - Group by arguments.
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
      T extends RequestInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestInfoGroupByArgs['orderBy'] }
        : { orderBy?: RequestInfoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RequestInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestInfo model
   */
  readonly fields: RequestInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RequestInfo model
   */
  interface RequestInfoFieldRefs {
    readonly requestInfoId: FieldRef<"RequestInfo", 'String'>
    readonly personId: FieldRef<"RequestInfo", 'String'>
    readonly purpose: FieldRef<"RequestInfo", 'String'>
    readonly requestingAgency: FieldRef<"RequestInfo", 'String'>
    readonly createdAt: FieldRef<"RequestInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestInfo findUnique
   */
  export type RequestInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * Filter, which RequestInfo to fetch.
     */
    where: RequestInfoWhereUniqueInput
  }

  /**
   * RequestInfo findUniqueOrThrow
   */
  export type RequestInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * Filter, which RequestInfo to fetch.
     */
    where: RequestInfoWhereUniqueInput
  }

  /**
   * RequestInfo findFirst
   */
  export type RequestInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * Filter, which RequestInfo to fetch.
     */
    where?: RequestInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestInfos to fetch.
     */
    orderBy?: RequestInfoOrderByWithRelationInput | RequestInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestInfos.
     */
    cursor?: RequestInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestInfos.
     */
    distinct?: RequestInfoScalarFieldEnum | RequestInfoScalarFieldEnum[]
  }

  /**
   * RequestInfo findFirstOrThrow
   */
  export type RequestInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * Filter, which RequestInfo to fetch.
     */
    where?: RequestInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestInfos to fetch.
     */
    orderBy?: RequestInfoOrderByWithRelationInput | RequestInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestInfos.
     */
    cursor?: RequestInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestInfos.
     */
    distinct?: RequestInfoScalarFieldEnum | RequestInfoScalarFieldEnum[]
  }

  /**
   * RequestInfo findMany
   */
  export type RequestInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * Filter, which RequestInfos to fetch.
     */
    where?: RequestInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestInfos to fetch.
     */
    orderBy?: RequestInfoOrderByWithRelationInput | RequestInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestInfos.
     */
    cursor?: RequestInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestInfos.
     */
    distinct?: RequestInfoScalarFieldEnum | RequestInfoScalarFieldEnum[]
  }

  /**
   * RequestInfo create
   */
  export type RequestInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestInfo.
     */
    data: XOR<RequestInfoCreateInput, RequestInfoUncheckedCreateInput>
  }

  /**
   * RequestInfo createMany
   */
  export type RequestInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestInfos.
     */
    data: RequestInfoCreateManyInput | RequestInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestInfo createManyAndReturn
   */
  export type RequestInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * The data used to create many RequestInfos.
     */
    data: RequestInfoCreateManyInput | RequestInfoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestInfo update
   */
  export type RequestInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestInfo.
     */
    data: XOR<RequestInfoUpdateInput, RequestInfoUncheckedUpdateInput>
    /**
     * Choose, which RequestInfo to update.
     */
    where: RequestInfoWhereUniqueInput
  }

  /**
   * RequestInfo updateMany
   */
  export type RequestInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestInfos.
     */
    data: XOR<RequestInfoUpdateManyMutationInput, RequestInfoUncheckedUpdateManyInput>
    /**
     * Filter which RequestInfos to update
     */
    where?: RequestInfoWhereInput
    /**
     * Limit how many RequestInfos to update.
     */
    limit?: number
  }

  /**
   * RequestInfo updateManyAndReturn
   */
  export type RequestInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * The data used to update RequestInfos.
     */
    data: XOR<RequestInfoUpdateManyMutationInput, RequestInfoUncheckedUpdateManyInput>
    /**
     * Filter which RequestInfos to update
     */
    where?: RequestInfoWhereInput
    /**
     * Limit how many RequestInfos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestInfo upsert
   */
  export type RequestInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestInfo to update in case it exists.
     */
    where: RequestInfoWhereUniqueInput
    /**
     * In case the RequestInfo found by the `where` argument doesn't exist, create a new RequestInfo with this data.
     */
    create: XOR<RequestInfoCreateInput, RequestInfoUncheckedCreateInput>
    /**
     * In case the RequestInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestInfoUpdateInput, RequestInfoUncheckedUpdateInput>
  }

  /**
   * RequestInfo delete
   */
  export type RequestInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
    /**
     * Filter which RequestInfo to delete.
     */
    where: RequestInfoWhereUniqueInput
  }

  /**
   * RequestInfo deleteMany
   */
  export type RequestInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestInfos to delete
     */
    where?: RequestInfoWhereInput
    /**
     * Limit how many RequestInfos to delete.
     */
    limit?: number
  }

  /**
   * RequestInfo without action
   */
  export type RequestInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestInfo
     */
    select?: RequestInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestInfo
     */
    omit?: RequestInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestInfoInclude<ExtArgs> | null
  }


  /**
   * Model Receipt
   */

  export type AggregateReceipt = {
    _count: ReceiptCountAggregateOutputType | null
    _avg: ReceiptAvgAggregateOutputType | null
    _sum: ReceiptSumAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  export type ReceiptAvgAggregateOutputType = {
    money: number | null
    priority: number | null
  }

  export type ReceiptSumAggregateOutputType = {
    money: number | null
    priority: number | null
  }

  export type ReceiptMinAggregateOutputType = {
    receiptId: string | null
    personId: string | null
    prefix: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    organizationId: string | null
    organizationName: string | null
    fullNameOrg: string | null
    rank: string | null
    position: string | null
    fullNameWithRank: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    money: number | null
    moneyText: string | null
    createdAt: Date | null
    priority: number | null
  }

  export type ReceiptMaxAggregateOutputType = {
    receiptId: string | null
    personId: string | null
    prefix: string | null
    firstName: string | null
    lastName: string | null
    fullName: string | null
    organizationId: string | null
    organizationName: string | null
    fullNameOrg: string | null
    rank: string | null
    position: string | null
    fullNameWithRank: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    money: number | null
    moneyText: string | null
    createdAt: Date | null
    priority: number | null
  }

  export type ReceiptCountAggregateOutputType = {
    receiptId: number
    personId: number
    prefix: number
    firstName: number
    lastName: number
    fullName: number
    organizationId: number
    organizationName: number
    fullNameOrg: number
    rank: number
    position: number
    fullNameWithRank: number
    receiptBookNo: number
    receiptNo: number
    receiptDate: number
    money: number
    moneyText: number
    createdAt: number
    priority: number
    _all: number
  }


  export type ReceiptAvgAggregateInputType = {
    money?: true
    priority?: true
  }

  export type ReceiptSumAggregateInputType = {
    money?: true
    priority?: true
  }

  export type ReceiptMinAggregateInputType = {
    receiptId?: true
    personId?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    organizationId?: true
    organizationName?: true
    fullNameOrg?: true
    rank?: true
    position?: true
    fullNameWithRank?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    money?: true
    moneyText?: true
    createdAt?: true
    priority?: true
  }

  export type ReceiptMaxAggregateInputType = {
    receiptId?: true
    personId?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    organizationId?: true
    organizationName?: true
    fullNameOrg?: true
    rank?: true
    position?: true
    fullNameWithRank?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    money?: true
    moneyText?: true
    createdAt?: true
    priority?: true
  }

  export type ReceiptCountAggregateInputType = {
    receiptId?: true
    personId?: true
    prefix?: true
    firstName?: true
    lastName?: true
    fullName?: true
    organizationId?: true
    organizationName?: true
    fullNameOrg?: true
    rank?: true
    position?: true
    fullNameWithRank?: true
    receiptBookNo?: true
    receiptNo?: true
    receiptDate?: true
    money?: true
    moneyText?: true
    createdAt?: true
    priority?: true
    _all?: true
  }

  export type ReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipt to aggregate.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Receipts
    **/
    _count?: true | ReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReceiptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReceiptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReceiptMaxAggregateInputType
  }

  export type GetReceiptAggregateType<T extends ReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReceipt[P]>
      : GetScalarType<T[P], AggregateReceipt[P]>
  }




  export type ReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithAggregationInput | ReceiptOrderByWithAggregationInput[]
    by: ReceiptScalarFieldEnum[] | ReceiptScalarFieldEnum
    having?: ReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReceiptCountAggregateInputType | true
    _avg?: ReceiptAvgAggregateInputType
    _sum?: ReceiptSumAggregateInputType
    _min?: ReceiptMinAggregateInputType
    _max?: ReceiptMaxAggregateInputType
  }

  export type ReceiptGroupByOutputType = {
    receiptId: string
    personId: string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationId: string | null
    organizationName: string | null
    fullNameOrg: string | null
    rank: string | null
    position: string | null
    fullNameWithRank: string | null
    receiptBookNo: string | null
    receiptNo: string | null
    receiptDate: string | null
    money: number
    moneyText: string | null
    createdAt: Date
    priority: number
    _count: ReceiptCountAggregateOutputType | null
    _avg: ReceiptAvgAggregateOutputType | null
    _sum: ReceiptSumAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  type GetReceiptGroupByPayload<T extends ReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
        }
      >
    >


  export type ReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    receiptId?: boolean
    personId?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    createdAt?: boolean
    priority?: boolean
    organization?: boolean | Receipt$organizationArgs<ExtArgs>
    person?: boolean | Receipt$personArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    receiptId?: boolean
    personId?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    createdAt?: boolean
    priority?: boolean
    organization?: boolean | Receipt$organizationArgs<ExtArgs>
    person?: boolean | Receipt$personArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    receiptId?: boolean
    personId?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    createdAt?: boolean
    priority?: boolean
    organization?: boolean | Receipt$organizationArgs<ExtArgs>
    person?: boolean | Receipt$personArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectScalar = {
    receiptId?: boolean
    personId?: boolean
    prefix?: boolean
    firstName?: boolean
    lastName?: boolean
    fullName?: boolean
    organizationId?: boolean
    organizationName?: boolean
    fullNameOrg?: boolean
    rank?: boolean
    position?: boolean
    fullNameWithRank?: boolean
    receiptBookNo?: boolean
    receiptNo?: boolean
    receiptDate?: boolean
    money?: boolean
    moneyText?: boolean
    createdAt?: boolean
    priority?: boolean
  }

  export type ReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"receiptId" | "personId" | "prefix" | "firstName" | "lastName" | "fullName" | "organizationId" | "organizationName" | "fullNameOrg" | "rank" | "position" | "fullNameWithRank" | "receiptBookNo" | "receiptNo" | "receiptDate" | "money" | "moneyText" | "createdAt" | "priority", ExtArgs["result"]["receipt"]>
  export type ReceiptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Receipt$organizationArgs<ExtArgs>
    person?: boolean | Receipt$personArgs<ExtArgs>
  }
  export type ReceiptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Receipt$organizationArgs<ExtArgs>
    person?: boolean | Receipt$personArgs<ExtArgs>
  }
  export type ReceiptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Receipt$organizationArgs<ExtArgs>
    person?: boolean | Receipt$personArgs<ExtArgs>
  }

  export type $ReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Receipt"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      person: Prisma.$PersonPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      receiptId: string
      personId: string | null
      prefix: string
      firstName: string
      lastName: string
      fullName: string
      organizationId: string | null
      organizationName: string | null
      fullNameOrg: string | null
      rank: string | null
      position: string | null
      fullNameWithRank: string | null
      receiptBookNo: string | null
      receiptNo: string | null
      receiptDate: string | null
      money: number
      moneyText: string | null
      createdAt: Date
      priority: number
    }, ExtArgs["result"]["receipt"]>
    composites: {}
  }

  type ReceiptGetPayload<S extends boolean | null | undefined | ReceiptDefaultArgs> = $Result.GetResult<Prisma.$ReceiptPayload, S>

  type ReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReceiptCountAggregateInputType | true
    }

  export interface ReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Receipt'], meta: { name: 'Receipt' } }
    /**
     * Find zero or one Receipt that matches the filter.
     * @param {ReceiptFindUniqueArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReceiptFindUniqueArgs>(args: SelectSubset<T, ReceiptFindUniqueArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Receipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReceiptFindUniqueOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, ReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReceiptFindFirstArgs>(args?: SelectSubset<T, ReceiptFindFirstArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, ReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Receipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Receipts
     * const receipts = await prisma.receipt.findMany()
     * 
     * // Get first 10 Receipts
     * const receipts = await prisma.receipt.findMany({ take: 10 })
     * 
     * // Only select the `receiptId`
     * const receiptWithReceiptIdOnly = await prisma.receipt.findMany({ select: { receiptId: true } })
     * 
     */
    findMany<T extends ReceiptFindManyArgs>(args?: SelectSubset<T, ReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Receipt.
     * @param {ReceiptCreateArgs} args - Arguments to create a Receipt.
     * @example
     * // Create one Receipt
     * const Receipt = await prisma.receipt.create({
     *   data: {
     *     // ... data to create a Receipt
     *   }
     * })
     * 
     */
    create<T extends ReceiptCreateArgs>(args: SelectSubset<T, ReceiptCreateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Receipts.
     * @param {ReceiptCreateManyArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReceiptCreateManyArgs>(args?: SelectSubset<T, ReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Receipts and returns the data saved in the database.
     * @param {ReceiptCreateManyAndReturnArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Receipts and only return the `receiptId`
     * const receiptWithReceiptIdOnly = await prisma.receipt.createManyAndReturn({
     *   select: { receiptId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, ReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Receipt.
     * @param {ReceiptDeleteArgs} args - Arguments to delete one Receipt.
     * @example
     * // Delete one Receipt
     * const Receipt = await prisma.receipt.delete({
     *   where: {
     *     // ... filter to delete one Receipt
     *   }
     * })
     * 
     */
    delete<T extends ReceiptDeleteArgs>(args: SelectSubset<T, ReceiptDeleteArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Receipt.
     * @param {ReceiptUpdateArgs} args - Arguments to update one Receipt.
     * @example
     * // Update one Receipt
     * const receipt = await prisma.receipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReceiptUpdateArgs>(args: SelectSubset<T, ReceiptUpdateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Receipts.
     * @param {ReceiptDeleteManyArgs} args - Arguments to filter Receipts to delete.
     * @example
     * // Delete a few Receipts
     * const { count } = await prisma.receipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReceiptDeleteManyArgs>(args?: SelectSubset<T, ReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReceiptUpdateManyArgs>(args: SelectSubset<T, ReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts and returns the data updated in the database.
     * @param {ReceiptUpdateManyAndReturnArgs} args - Arguments to update many Receipts.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Receipts and only return the `receiptId`
     * const receiptWithReceiptIdOnly = await prisma.receipt.updateManyAndReturn({
     *   select: { receiptId: true },
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
    updateManyAndReturn<T extends ReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, ReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Receipt.
     * @param {ReceiptUpsertArgs} args - Arguments to update or create a Receipt.
     * @example
     * // Update or create a Receipt
     * const receipt = await prisma.receipt.upsert({
     *   create: {
     *     // ... data to create a Receipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Receipt we want to update
     *   }
     * })
     */
    upsert<T extends ReceiptUpsertArgs>(args: SelectSubset<T, ReceiptUpsertArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptCountArgs} args - Arguments to filter Receipts to count.
     * @example
     * // Count the number of Receipts
     * const count = await prisma.receipt.count({
     *   where: {
     *     // ... the filter for the Receipts we want to count
     *   }
     * })
    **/
    count<T extends ReceiptCountArgs>(
      args?: Subset<T, ReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReceiptAggregateArgs>(args: Subset<T, ReceiptAggregateArgs>): Prisma.PrismaPromise<GetReceiptAggregateType<T>>

    /**
     * Group by Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptGroupByArgs} args - Group by arguments.
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
      T extends ReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReceiptGroupByArgs['orderBy'] }
        : { orderBy?: ReceiptGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Receipt model
   */
  readonly fields: ReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Receipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends Receipt$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Receipt$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    person<T extends Receipt$personArgs<ExtArgs> = {}>(args?: Subset<T, Receipt$personArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Receipt model
   */
  interface ReceiptFieldRefs {
    readonly receiptId: FieldRef<"Receipt", 'String'>
    readonly personId: FieldRef<"Receipt", 'String'>
    readonly prefix: FieldRef<"Receipt", 'String'>
    readonly firstName: FieldRef<"Receipt", 'String'>
    readonly lastName: FieldRef<"Receipt", 'String'>
    readonly fullName: FieldRef<"Receipt", 'String'>
    readonly organizationId: FieldRef<"Receipt", 'String'>
    readonly organizationName: FieldRef<"Receipt", 'String'>
    readonly fullNameOrg: FieldRef<"Receipt", 'String'>
    readonly rank: FieldRef<"Receipt", 'String'>
    readonly position: FieldRef<"Receipt", 'String'>
    readonly fullNameWithRank: FieldRef<"Receipt", 'String'>
    readonly receiptBookNo: FieldRef<"Receipt", 'String'>
    readonly receiptNo: FieldRef<"Receipt", 'String'>
    readonly receiptDate: FieldRef<"Receipt", 'String'>
    readonly money: FieldRef<"Receipt", 'Int'>
    readonly moneyText: FieldRef<"Receipt", 'String'>
    readonly createdAt: FieldRef<"Receipt", 'DateTime'>
    readonly priority: FieldRef<"Receipt", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Receipt findUnique
   */
  export type ReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findUniqueOrThrow
   */
  export type ReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findFirst
   */
  export type ReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findFirstOrThrow
   */
  export type ReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findMany
   */
  export type ReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipts to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt create
   */
  export type ReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to create a Receipt.
     */
    data: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
  }

  /**
   * Receipt createMany
   */
  export type ReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Receipt createManyAndReturn
   */
  export type ReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt update
   */
  export type ReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to update a Receipt.
     */
    data: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
    /**
     * Choose, which Receipt to update.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt updateMany
   */
  export type ReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
  }

  /**
   * Receipt updateManyAndReturn
   */
  export type ReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt upsert
   */
  export type ReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The filter to search for the Receipt to update in case it exists.
     */
    where: ReceiptWhereUniqueInput
    /**
     * In case the Receipt found by the `where` argument doesn't exist, create a new Receipt with this data.
     */
    create: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
    /**
     * In case the Receipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
  }

  /**
   * Receipt delete
   */
  export type ReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter which Receipt to delete.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt deleteMany
   */
  export type ReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipts to delete
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to delete.
     */
    limit?: number
  }

  /**
   * Receipt.organization
   */
  export type Receipt$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Receipt.person
   */
  export type Receipt$personArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
  }

  /**
   * Receipt without action
   */
  export type ReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
  }


  /**
   * Model ForensicSubmission
   */

  export type AggregateForensicSubmission = {
    _count: ForensicSubmissionCountAggregateOutputType | null
    _avg: ForensicSubmissionAvgAggregateOutputType | null
    _sum: ForensicSubmissionSumAggregateOutputType | null
    _min: ForensicSubmissionMinAggregateOutputType | null
    _max: ForensicSubmissionMaxAggregateOutputType | null
  }

  export type ForensicSubmissionAvgAggregateOutputType = {
    status: number | null
  }

  export type ForensicSubmissionSumAggregateOutputType = {
    status: number | null
  }

  export type ForensicSubmissionMinAggregateOutputType = {
    submissionId: string | null
    submissionNo: string | null
    submissionDate: Date | null
    createdAt: Date | null
    status: number | null
    statusUpdatedAt: Date | null
  }

  export type ForensicSubmissionMaxAggregateOutputType = {
    submissionId: string | null
    submissionNo: string | null
    submissionDate: Date | null
    createdAt: Date | null
    status: number | null
    statusUpdatedAt: Date | null
  }

  export type ForensicSubmissionCountAggregateOutputType = {
    submissionId: number
    submissionNo: number
    submissionDate: number
    createdAt: number
    status: number
    statusUpdatedAt: number
    _all: number
  }


  export type ForensicSubmissionAvgAggregateInputType = {
    status?: true
  }

  export type ForensicSubmissionSumAggregateInputType = {
    status?: true
  }

  export type ForensicSubmissionMinAggregateInputType = {
    submissionId?: true
    submissionNo?: true
    submissionDate?: true
    createdAt?: true
    status?: true
    statusUpdatedAt?: true
  }

  export type ForensicSubmissionMaxAggregateInputType = {
    submissionId?: true
    submissionNo?: true
    submissionDate?: true
    createdAt?: true
    status?: true
    statusUpdatedAt?: true
  }

  export type ForensicSubmissionCountAggregateInputType = {
    submissionId?: true
    submissionNo?: true
    submissionDate?: true
    createdAt?: true
    status?: true
    statusUpdatedAt?: true
    _all?: true
  }

  export type ForensicSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForensicSubmission to aggregate.
     */
    where?: ForensicSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissions to fetch.
     */
    orderBy?: ForensicSubmissionOrderByWithRelationInput | ForensicSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForensicSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForensicSubmissions
    **/
    _count?: true | ForensicSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForensicSubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForensicSubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForensicSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForensicSubmissionMaxAggregateInputType
  }

  export type GetForensicSubmissionAggregateType<T extends ForensicSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateForensicSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForensicSubmission[P]>
      : GetScalarType<T[P], AggregateForensicSubmission[P]>
  }




  export type ForensicSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForensicSubmissionWhereInput
    orderBy?: ForensicSubmissionOrderByWithAggregationInput | ForensicSubmissionOrderByWithAggregationInput[]
    by: ForensicSubmissionScalarFieldEnum[] | ForensicSubmissionScalarFieldEnum
    having?: ForensicSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForensicSubmissionCountAggregateInputType | true
    _avg?: ForensicSubmissionAvgAggregateInputType
    _sum?: ForensicSubmissionSumAggregateInputType
    _min?: ForensicSubmissionMinAggregateInputType
    _max?: ForensicSubmissionMaxAggregateInputType
  }

  export type ForensicSubmissionGroupByOutputType = {
    submissionId: string
    submissionNo: string | null
    submissionDate: Date
    createdAt: Date
    status: number
    statusUpdatedAt: Date | null
    _count: ForensicSubmissionCountAggregateOutputType | null
    _avg: ForensicSubmissionAvgAggregateOutputType | null
    _sum: ForensicSubmissionSumAggregateOutputType | null
    _min: ForensicSubmissionMinAggregateOutputType | null
    _max: ForensicSubmissionMaxAggregateOutputType | null
  }

  type GetForensicSubmissionGroupByPayload<T extends ForensicSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForensicSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForensicSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForensicSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], ForensicSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type ForensicSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    submissionId?: boolean
    submissionNo?: boolean
    submissionDate?: boolean
    createdAt?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    persons?: boolean | ForensicSubmission$personsArgs<ExtArgs>
    statusHistories?: boolean | ForensicSubmission$statusHistoriesArgs<ExtArgs>
    _count?: boolean | ForensicSubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmission"]>

  export type ForensicSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    submissionId?: boolean
    submissionNo?: boolean
    submissionDate?: boolean
    createdAt?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
  }, ExtArgs["result"]["forensicSubmission"]>

  export type ForensicSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    submissionId?: boolean
    submissionNo?: boolean
    submissionDate?: boolean
    createdAt?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
  }, ExtArgs["result"]["forensicSubmission"]>

  export type ForensicSubmissionSelectScalar = {
    submissionId?: boolean
    submissionNo?: boolean
    submissionDate?: boolean
    createdAt?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
  }

  export type ForensicSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"submissionId" | "submissionNo" | "submissionDate" | "createdAt" | "status" | "statusUpdatedAt", ExtArgs["result"]["forensicSubmission"]>
  export type ForensicSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persons?: boolean | ForensicSubmission$personsArgs<ExtArgs>
    statusHistories?: boolean | ForensicSubmission$statusHistoriesArgs<ExtArgs>
    _count?: boolean | ForensicSubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ForensicSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ForensicSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ForensicSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForensicSubmission"
    objects: {
      persons: Prisma.$ForensicSubmissionPersonPayload<ExtArgs>[]
      statusHistories: Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      submissionId: string
      submissionNo: string | null
      submissionDate: Date
      createdAt: Date
      status: number
      statusUpdatedAt: Date | null
    }, ExtArgs["result"]["forensicSubmission"]>
    composites: {}
  }

  type ForensicSubmissionGetPayload<S extends boolean | null | undefined | ForensicSubmissionDefaultArgs> = $Result.GetResult<Prisma.$ForensicSubmissionPayload, S>

  type ForensicSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForensicSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForensicSubmissionCountAggregateInputType | true
    }

  export interface ForensicSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForensicSubmission'], meta: { name: 'ForensicSubmission' } }
    /**
     * Find zero or one ForensicSubmission that matches the filter.
     * @param {ForensicSubmissionFindUniqueArgs} args - Arguments to find a ForensicSubmission
     * @example
     * // Get one ForensicSubmission
     * const forensicSubmission = await prisma.forensicSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForensicSubmissionFindUniqueArgs>(args: SelectSubset<T, ForensicSubmissionFindUniqueArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForensicSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForensicSubmissionFindUniqueOrThrowArgs} args - Arguments to find a ForensicSubmission
     * @example
     * // Get one ForensicSubmission
     * const forensicSubmission = await prisma.forensicSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForensicSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, ForensicSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForensicSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionFindFirstArgs} args - Arguments to find a ForensicSubmission
     * @example
     * // Get one ForensicSubmission
     * const forensicSubmission = await prisma.forensicSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForensicSubmissionFindFirstArgs>(args?: SelectSubset<T, ForensicSubmissionFindFirstArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForensicSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionFindFirstOrThrowArgs} args - Arguments to find a ForensicSubmission
     * @example
     * // Get one ForensicSubmission
     * const forensicSubmission = await prisma.forensicSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForensicSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, ForensicSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForensicSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForensicSubmissions
     * const forensicSubmissions = await prisma.forensicSubmission.findMany()
     * 
     * // Get first 10 ForensicSubmissions
     * const forensicSubmissions = await prisma.forensicSubmission.findMany({ take: 10 })
     * 
     * // Only select the `submissionId`
     * const forensicSubmissionWithSubmissionIdOnly = await prisma.forensicSubmission.findMany({ select: { submissionId: true } })
     * 
     */
    findMany<T extends ForensicSubmissionFindManyArgs>(args?: SelectSubset<T, ForensicSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForensicSubmission.
     * @param {ForensicSubmissionCreateArgs} args - Arguments to create a ForensicSubmission.
     * @example
     * // Create one ForensicSubmission
     * const ForensicSubmission = await prisma.forensicSubmission.create({
     *   data: {
     *     // ... data to create a ForensicSubmission
     *   }
     * })
     * 
     */
    create<T extends ForensicSubmissionCreateArgs>(args: SelectSubset<T, ForensicSubmissionCreateArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForensicSubmissions.
     * @param {ForensicSubmissionCreateManyArgs} args - Arguments to create many ForensicSubmissions.
     * @example
     * // Create many ForensicSubmissions
     * const forensicSubmission = await prisma.forensicSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForensicSubmissionCreateManyArgs>(args?: SelectSubset<T, ForensicSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForensicSubmissions and returns the data saved in the database.
     * @param {ForensicSubmissionCreateManyAndReturnArgs} args - Arguments to create many ForensicSubmissions.
     * @example
     * // Create many ForensicSubmissions
     * const forensicSubmission = await prisma.forensicSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForensicSubmissions and only return the `submissionId`
     * const forensicSubmissionWithSubmissionIdOnly = await prisma.forensicSubmission.createManyAndReturn({
     *   select: { submissionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForensicSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, ForensicSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForensicSubmission.
     * @param {ForensicSubmissionDeleteArgs} args - Arguments to delete one ForensicSubmission.
     * @example
     * // Delete one ForensicSubmission
     * const ForensicSubmission = await prisma.forensicSubmission.delete({
     *   where: {
     *     // ... filter to delete one ForensicSubmission
     *   }
     * })
     * 
     */
    delete<T extends ForensicSubmissionDeleteArgs>(args: SelectSubset<T, ForensicSubmissionDeleteArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForensicSubmission.
     * @param {ForensicSubmissionUpdateArgs} args - Arguments to update one ForensicSubmission.
     * @example
     * // Update one ForensicSubmission
     * const forensicSubmission = await prisma.forensicSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForensicSubmissionUpdateArgs>(args: SelectSubset<T, ForensicSubmissionUpdateArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForensicSubmissions.
     * @param {ForensicSubmissionDeleteManyArgs} args - Arguments to filter ForensicSubmissions to delete.
     * @example
     * // Delete a few ForensicSubmissions
     * const { count } = await prisma.forensicSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForensicSubmissionDeleteManyArgs>(args?: SelectSubset<T, ForensicSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForensicSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForensicSubmissions
     * const forensicSubmission = await prisma.forensicSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForensicSubmissionUpdateManyArgs>(args: SelectSubset<T, ForensicSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForensicSubmissions and returns the data updated in the database.
     * @param {ForensicSubmissionUpdateManyAndReturnArgs} args - Arguments to update many ForensicSubmissions.
     * @example
     * // Update many ForensicSubmissions
     * const forensicSubmission = await prisma.forensicSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForensicSubmissions and only return the `submissionId`
     * const forensicSubmissionWithSubmissionIdOnly = await prisma.forensicSubmission.updateManyAndReturn({
     *   select: { submissionId: true },
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
    updateManyAndReturn<T extends ForensicSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, ForensicSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForensicSubmission.
     * @param {ForensicSubmissionUpsertArgs} args - Arguments to update or create a ForensicSubmission.
     * @example
     * // Update or create a ForensicSubmission
     * const forensicSubmission = await prisma.forensicSubmission.upsert({
     *   create: {
     *     // ... data to create a ForensicSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForensicSubmission we want to update
     *   }
     * })
     */
    upsert<T extends ForensicSubmissionUpsertArgs>(args: SelectSubset<T, ForensicSubmissionUpsertArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForensicSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionCountArgs} args - Arguments to filter ForensicSubmissions to count.
     * @example
     * // Count the number of ForensicSubmissions
     * const count = await prisma.forensicSubmission.count({
     *   where: {
     *     // ... the filter for the ForensicSubmissions we want to count
     *   }
     * })
    **/
    count<T extends ForensicSubmissionCountArgs>(
      args?: Subset<T, ForensicSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForensicSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForensicSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ForensicSubmissionAggregateArgs>(args: Subset<T, ForensicSubmissionAggregateArgs>): Prisma.PrismaPromise<GetForensicSubmissionAggregateType<T>>

    /**
     * Group by ForensicSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionGroupByArgs} args - Group by arguments.
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
      T extends ForensicSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForensicSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: ForensicSubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ForensicSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForensicSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForensicSubmission model
   */
  readonly fields: ForensicSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForensicSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForensicSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    persons<T extends ForensicSubmission$personsArgs<ExtArgs> = {}>(args?: Subset<T, ForensicSubmission$personsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusHistories<T extends ForensicSubmission$statusHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, ForensicSubmission$statusHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ForensicSubmission model
   */
  interface ForensicSubmissionFieldRefs {
    readonly submissionId: FieldRef<"ForensicSubmission", 'String'>
    readonly submissionNo: FieldRef<"ForensicSubmission", 'String'>
    readonly submissionDate: FieldRef<"ForensicSubmission", 'DateTime'>
    readonly createdAt: FieldRef<"ForensicSubmission", 'DateTime'>
    readonly status: FieldRef<"ForensicSubmission", 'Int'>
    readonly statusUpdatedAt: FieldRef<"ForensicSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForensicSubmission findUnique
   */
  export type ForensicSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmission to fetch.
     */
    where: ForensicSubmissionWhereUniqueInput
  }

  /**
   * ForensicSubmission findUniqueOrThrow
   */
  export type ForensicSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmission to fetch.
     */
    where: ForensicSubmissionWhereUniqueInput
  }

  /**
   * ForensicSubmission findFirst
   */
  export type ForensicSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmission to fetch.
     */
    where?: ForensicSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissions to fetch.
     */
    orderBy?: ForensicSubmissionOrderByWithRelationInput | ForensicSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForensicSubmissions.
     */
    cursor?: ForensicSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissions.
     */
    distinct?: ForensicSubmissionScalarFieldEnum | ForensicSubmissionScalarFieldEnum[]
  }

  /**
   * ForensicSubmission findFirstOrThrow
   */
  export type ForensicSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmission to fetch.
     */
    where?: ForensicSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissions to fetch.
     */
    orderBy?: ForensicSubmissionOrderByWithRelationInput | ForensicSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForensicSubmissions.
     */
    cursor?: ForensicSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissions.
     */
    distinct?: ForensicSubmissionScalarFieldEnum | ForensicSubmissionScalarFieldEnum[]
  }

  /**
   * ForensicSubmission findMany
   */
  export type ForensicSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissions to fetch.
     */
    where?: ForensicSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissions to fetch.
     */
    orderBy?: ForensicSubmissionOrderByWithRelationInput | ForensicSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForensicSubmissions.
     */
    cursor?: ForensicSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissions.
     */
    distinct?: ForensicSubmissionScalarFieldEnum | ForensicSubmissionScalarFieldEnum[]
  }

  /**
   * ForensicSubmission create
   */
  export type ForensicSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a ForensicSubmission.
     */
    data?: XOR<ForensicSubmissionCreateInput, ForensicSubmissionUncheckedCreateInput>
  }

  /**
   * ForensicSubmission createMany
   */
  export type ForensicSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForensicSubmissions.
     */
    data: ForensicSubmissionCreateManyInput | ForensicSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForensicSubmission createManyAndReturn
   */
  export type ForensicSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many ForensicSubmissions.
     */
    data: ForensicSubmissionCreateManyInput | ForensicSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForensicSubmission update
   */
  export type ForensicSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a ForensicSubmission.
     */
    data: XOR<ForensicSubmissionUpdateInput, ForensicSubmissionUncheckedUpdateInput>
    /**
     * Choose, which ForensicSubmission to update.
     */
    where: ForensicSubmissionWhereUniqueInput
  }

  /**
   * ForensicSubmission updateMany
   */
  export type ForensicSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForensicSubmissions.
     */
    data: XOR<ForensicSubmissionUpdateManyMutationInput, ForensicSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ForensicSubmissions to update
     */
    where?: ForensicSubmissionWhereInput
    /**
     * Limit how many ForensicSubmissions to update.
     */
    limit?: number
  }

  /**
   * ForensicSubmission updateManyAndReturn
   */
  export type ForensicSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update ForensicSubmissions.
     */
    data: XOR<ForensicSubmissionUpdateManyMutationInput, ForensicSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ForensicSubmissions to update
     */
    where?: ForensicSubmissionWhereInput
    /**
     * Limit how many ForensicSubmissions to update.
     */
    limit?: number
  }

  /**
   * ForensicSubmission upsert
   */
  export type ForensicSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the ForensicSubmission to update in case it exists.
     */
    where: ForensicSubmissionWhereUniqueInput
    /**
     * In case the ForensicSubmission found by the `where` argument doesn't exist, create a new ForensicSubmission with this data.
     */
    create: XOR<ForensicSubmissionCreateInput, ForensicSubmissionUncheckedCreateInput>
    /**
     * In case the ForensicSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForensicSubmissionUpdateInput, ForensicSubmissionUncheckedUpdateInput>
  }

  /**
   * ForensicSubmission delete
   */
  export type ForensicSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
    /**
     * Filter which ForensicSubmission to delete.
     */
    where: ForensicSubmissionWhereUniqueInput
  }

  /**
   * ForensicSubmission deleteMany
   */
  export type ForensicSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForensicSubmissions to delete
     */
    where?: ForensicSubmissionWhereInput
    /**
     * Limit how many ForensicSubmissions to delete.
     */
    limit?: number
  }

  /**
   * ForensicSubmission.persons
   */
  export type ForensicSubmission$personsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    where?: ForensicSubmissionPersonWhereInput
    orderBy?: ForensicSubmissionPersonOrderByWithRelationInput | ForensicSubmissionPersonOrderByWithRelationInput[]
    cursor?: ForensicSubmissionPersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForensicSubmissionPersonScalarFieldEnum | ForensicSubmissionPersonScalarFieldEnum[]
  }

  /**
   * ForensicSubmission.statusHistories
   */
  export type ForensicSubmission$statusHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    where?: ForensicSubmissionStatusHistoryWhereInput
    orderBy?: ForensicSubmissionStatusHistoryOrderByWithRelationInput | ForensicSubmissionStatusHistoryOrderByWithRelationInput[]
    cursor?: ForensicSubmissionStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForensicSubmissionStatusHistoryScalarFieldEnum | ForensicSubmissionStatusHistoryScalarFieldEnum[]
  }

  /**
   * ForensicSubmission without action
   */
  export type ForensicSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmission
     */
    select?: ForensicSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmission
     */
    omit?: ForensicSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model ForensicSubmissionPerson
   */

  export type AggregateForensicSubmissionPerson = {
    _count: ForensicSubmissionPersonCountAggregateOutputType | null
    _min: ForensicSubmissionPersonMinAggregateOutputType | null
    _max: ForensicSubmissionPersonMaxAggregateOutputType | null
  }

  export type ForensicSubmissionPersonMinAggregateOutputType = {
    id: string | null
    submissionId: string | null
    personId: string | null
  }

  export type ForensicSubmissionPersonMaxAggregateOutputType = {
    id: string | null
    submissionId: string | null
    personId: string | null
  }

  export type ForensicSubmissionPersonCountAggregateOutputType = {
    id: number
    submissionId: number
    personId: number
    _all: number
  }


  export type ForensicSubmissionPersonMinAggregateInputType = {
    id?: true
    submissionId?: true
    personId?: true
  }

  export type ForensicSubmissionPersonMaxAggregateInputType = {
    id?: true
    submissionId?: true
    personId?: true
  }

  export type ForensicSubmissionPersonCountAggregateInputType = {
    id?: true
    submissionId?: true
    personId?: true
    _all?: true
  }

  export type ForensicSubmissionPersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForensicSubmissionPerson to aggregate.
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionPeople to fetch.
     */
    orderBy?: ForensicSubmissionPersonOrderByWithRelationInput | ForensicSubmissionPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForensicSubmissionPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForensicSubmissionPeople
    **/
    _count?: true | ForensicSubmissionPersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForensicSubmissionPersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForensicSubmissionPersonMaxAggregateInputType
  }

  export type GetForensicSubmissionPersonAggregateType<T extends ForensicSubmissionPersonAggregateArgs> = {
        [P in keyof T & keyof AggregateForensicSubmissionPerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForensicSubmissionPerson[P]>
      : GetScalarType<T[P], AggregateForensicSubmissionPerson[P]>
  }




  export type ForensicSubmissionPersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForensicSubmissionPersonWhereInput
    orderBy?: ForensicSubmissionPersonOrderByWithAggregationInput | ForensicSubmissionPersonOrderByWithAggregationInput[]
    by: ForensicSubmissionPersonScalarFieldEnum[] | ForensicSubmissionPersonScalarFieldEnum
    having?: ForensicSubmissionPersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForensicSubmissionPersonCountAggregateInputType | true
    _min?: ForensicSubmissionPersonMinAggregateInputType
    _max?: ForensicSubmissionPersonMaxAggregateInputType
  }

  export type ForensicSubmissionPersonGroupByOutputType = {
    id: string
    submissionId: string
    personId: string
    _count: ForensicSubmissionPersonCountAggregateOutputType | null
    _min: ForensicSubmissionPersonMinAggregateOutputType | null
    _max: ForensicSubmissionPersonMaxAggregateOutputType | null
  }

  type GetForensicSubmissionPersonGroupByPayload<T extends ForensicSubmissionPersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForensicSubmissionPersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForensicSubmissionPersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForensicSubmissionPersonGroupByOutputType[P]>
            : GetScalarType<T[P], ForensicSubmissionPersonGroupByOutputType[P]>
        }
      >
    >


  export type ForensicSubmissionPersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    personId?: boolean
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmissionPerson"]>

  export type ForensicSubmissionPersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    personId?: boolean
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmissionPerson"]>

  export type ForensicSubmissionPersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    personId?: boolean
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmissionPerson"]>

  export type ForensicSubmissionPersonSelectScalar = {
    id?: boolean
    submissionId?: boolean
    personId?: boolean
  }

  export type ForensicSubmissionPersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submissionId" | "personId", ExtArgs["result"]["forensicSubmissionPerson"]>
  export type ForensicSubmissionPersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type ForensicSubmissionPersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type ForensicSubmissionPersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
    person?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $ForensicSubmissionPersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForensicSubmissionPerson"
    objects: {
      submission: Prisma.$ForensicSubmissionPayload<ExtArgs>
      person: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      submissionId: string
      personId: string
    }, ExtArgs["result"]["forensicSubmissionPerson"]>
    composites: {}
  }

  type ForensicSubmissionPersonGetPayload<S extends boolean | null | undefined | ForensicSubmissionPersonDefaultArgs> = $Result.GetResult<Prisma.$ForensicSubmissionPersonPayload, S>

  type ForensicSubmissionPersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForensicSubmissionPersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForensicSubmissionPersonCountAggregateInputType | true
    }

  export interface ForensicSubmissionPersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForensicSubmissionPerson'], meta: { name: 'ForensicSubmissionPerson' } }
    /**
     * Find zero or one ForensicSubmissionPerson that matches the filter.
     * @param {ForensicSubmissionPersonFindUniqueArgs} args - Arguments to find a ForensicSubmissionPerson
     * @example
     * // Get one ForensicSubmissionPerson
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForensicSubmissionPersonFindUniqueArgs>(args: SelectSubset<T, ForensicSubmissionPersonFindUniqueArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForensicSubmissionPerson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForensicSubmissionPersonFindUniqueOrThrowArgs} args - Arguments to find a ForensicSubmissionPerson
     * @example
     * // Get one ForensicSubmissionPerson
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForensicSubmissionPersonFindUniqueOrThrowArgs>(args: SelectSubset<T, ForensicSubmissionPersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForensicSubmissionPerson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonFindFirstArgs} args - Arguments to find a ForensicSubmissionPerson
     * @example
     * // Get one ForensicSubmissionPerson
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForensicSubmissionPersonFindFirstArgs>(args?: SelectSubset<T, ForensicSubmissionPersonFindFirstArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForensicSubmissionPerson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonFindFirstOrThrowArgs} args - Arguments to find a ForensicSubmissionPerson
     * @example
     * // Get one ForensicSubmissionPerson
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForensicSubmissionPersonFindFirstOrThrowArgs>(args?: SelectSubset<T, ForensicSubmissionPersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForensicSubmissionPeople that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForensicSubmissionPeople
     * const forensicSubmissionPeople = await prisma.forensicSubmissionPerson.findMany()
     * 
     * // Get first 10 ForensicSubmissionPeople
     * const forensicSubmissionPeople = await prisma.forensicSubmissionPerson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forensicSubmissionPersonWithIdOnly = await prisma.forensicSubmissionPerson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForensicSubmissionPersonFindManyArgs>(args?: SelectSubset<T, ForensicSubmissionPersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForensicSubmissionPerson.
     * @param {ForensicSubmissionPersonCreateArgs} args - Arguments to create a ForensicSubmissionPerson.
     * @example
     * // Create one ForensicSubmissionPerson
     * const ForensicSubmissionPerson = await prisma.forensicSubmissionPerson.create({
     *   data: {
     *     // ... data to create a ForensicSubmissionPerson
     *   }
     * })
     * 
     */
    create<T extends ForensicSubmissionPersonCreateArgs>(args: SelectSubset<T, ForensicSubmissionPersonCreateArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForensicSubmissionPeople.
     * @param {ForensicSubmissionPersonCreateManyArgs} args - Arguments to create many ForensicSubmissionPeople.
     * @example
     * // Create many ForensicSubmissionPeople
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForensicSubmissionPersonCreateManyArgs>(args?: SelectSubset<T, ForensicSubmissionPersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForensicSubmissionPeople and returns the data saved in the database.
     * @param {ForensicSubmissionPersonCreateManyAndReturnArgs} args - Arguments to create many ForensicSubmissionPeople.
     * @example
     * // Create many ForensicSubmissionPeople
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForensicSubmissionPeople and only return the `id`
     * const forensicSubmissionPersonWithIdOnly = await prisma.forensicSubmissionPerson.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForensicSubmissionPersonCreateManyAndReturnArgs>(args?: SelectSubset<T, ForensicSubmissionPersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForensicSubmissionPerson.
     * @param {ForensicSubmissionPersonDeleteArgs} args - Arguments to delete one ForensicSubmissionPerson.
     * @example
     * // Delete one ForensicSubmissionPerson
     * const ForensicSubmissionPerson = await prisma.forensicSubmissionPerson.delete({
     *   where: {
     *     // ... filter to delete one ForensicSubmissionPerson
     *   }
     * })
     * 
     */
    delete<T extends ForensicSubmissionPersonDeleteArgs>(args: SelectSubset<T, ForensicSubmissionPersonDeleteArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForensicSubmissionPerson.
     * @param {ForensicSubmissionPersonUpdateArgs} args - Arguments to update one ForensicSubmissionPerson.
     * @example
     * // Update one ForensicSubmissionPerson
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForensicSubmissionPersonUpdateArgs>(args: SelectSubset<T, ForensicSubmissionPersonUpdateArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForensicSubmissionPeople.
     * @param {ForensicSubmissionPersonDeleteManyArgs} args - Arguments to filter ForensicSubmissionPeople to delete.
     * @example
     * // Delete a few ForensicSubmissionPeople
     * const { count } = await prisma.forensicSubmissionPerson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForensicSubmissionPersonDeleteManyArgs>(args?: SelectSubset<T, ForensicSubmissionPersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForensicSubmissionPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForensicSubmissionPeople
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForensicSubmissionPersonUpdateManyArgs>(args: SelectSubset<T, ForensicSubmissionPersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForensicSubmissionPeople and returns the data updated in the database.
     * @param {ForensicSubmissionPersonUpdateManyAndReturnArgs} args - Arguments to update many ForensicSubmissionPeople.
     * @example
     * // Update many ForensicSubmissionPeople
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForensicSubmissionPeople and only return the `id`
     * const forensicSubmissionPersonWithIdOnly = await prisma.forensicSubmissionPerson.updateManyAndReturn({
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
    updateManyAndReturn<T extends ForensicSubmissionPersonUpdateManyAndReturnArgs>(args: SelectSubset<T, ForensicSubmissionPersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForensicSubmissionPerson.
     * @param {ForensicSubmissionPersonUpsertArgs} args - Arguments to update or create a ForensicSubmissionPerson.
     * @example
     * // Update or create a ForensicSubmissionPerson
     * const forensicSubmissionPerson = await prisma.forensicSubmissionPerson.upsert({
     *   create: {
     *     // ... data to create a ForensicSubmissionPerson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForensicSubmissionPerson we want to update
     *   }
     * })
     */
    upsert<T extends ForensicSubmissionPersonUpsertArgs>(args: SelectSubset<T, ForensicSubmissionPersonUpsertArgs<ExtArgs>>): Prisma__ForensicSubmissionPersonClient<$Result.GetResult<Prisma.$ForensicSubmissionPersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForensicSubmissionPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonCountArgs} args - Arguments to filter ForensicSubmissionPeople to count.
     * @example
     * // Count the number of ForensicSubmissionPeople
     * const count = await prisma.forensicSubmissionPerson.count({
     *   where: {
     *     // ... the filter for the ForensicSubmissionPeople we want to count
     *   }
     * })
    **/
    count<T extends ForensicSubmissionPersonCountArgs>(
      args?: Subset<T, ForensicSubmissionPersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForensicSubmissionPersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForensicSubmissionPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ForensicSubmissionPersonAggregateArgs>(args: Subset<T, ForensicSubmissionPersonAggregateArgs>): Prisma.PrismaPromise<GetForensicSubmissionPersonAggregateType<T>>

    /**
     * Group by ForensicSubmissionPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionPersonGroupByArgs} args - Group by arguments.
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
      T extends ForensicSubmissionPersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForensicSubmissionPersonGroupByArgs['orderBy'] }
        : { orderBy?: ForensicSubmissionPersonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ForensicSubmissionPersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForensicSubmissionPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForensicSubmissionPerson model
   */
  readonly fields: ForensicSubmissionPersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForensicSubmissionPerson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForensicSubmissionPersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submission<T extends ForensicSubmissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForensicSubmissionDefaultArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ForensicSubmissionPerson model
   */
  interface ForensicSubmissionPersonFieldRefs {
    readonly id: FieldRef<"ForensicSubmissionPerson", 'String'>
    readonly submissionId: FieldRef<"ForensicSubmissionPerson", 'String'>
    readonly personId: FieldRef<"ForensicSubmissionPerson", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ForensicSubmissionPerson findUnique
   */
  export type ForensicSubmissionPersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionPerson to fetch.
     */
    where: ForensicSubmissionPersonWhereUniqueInput
  }

  /**
   * ForensicSubmissionPerson findUniqueOrThrow
   */
  export type ForensicSubmissionPersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionPerson to fetch.
     */
    where: ForensicSubmissionPersonWhereUniqueInput
  }

  /**
   * ForensicSubmissionPerson findFirst
   */
  export type ForensicSubmissionPersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionPerson to fetch.
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionPeople to fetch.
     */
    orderBy?: ForensicSubmissionPersonOrderByWithRelationInput | ForensicSubmissionPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForensicSubmissionPeople.
     */
    cursor?: ForensicSubmissionPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissionPeople.
     */
    distinct?: ForensicSubmissionPersonScalarFieldEnum | ForensicSubmissionPersonScalarFieldEnum[]
  }

  /**
   * ForensicSubmissionPerson findFirstOrThrow
   */
  export type ForensicSubmissionPersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionPerson to fetch.
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionPeople to fetch.
     */
    orderBy?: ForensicSubmissionPersonOrderByWithRelationInput | ForensicSubmissionPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForensicSubmissionPeople.
     */
    cursor?: ForensicSubmissionPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissionPeople.
     */
    distinct?: ForensicSubmissionPersonScalarFieldEnum | ForensicSubmissionPersonScalarFieldEnum[]
  }

  /**
   * ForensicSubmissionPerson findMany
   */
  export type ForensicSubmissionPersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionPeople to fetch.
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionPeople to fetch.
     */
    orderBy?: ForensicSubmissionPersonOrderByWithRelationInput | ForensicSubmissionPersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForensicSubmissionPeople.
     */
    cursor?: ForensicSubmissionPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionPeople from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionPeople.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissionPeople.
     */
    distinct?: ForensicSubmissionPersonScalarFieldEnum | ForensicSubmissionPersonScalarFieldEnum[]
  }

  /**
   * ForensicSubmissionPerson create
   */
  export type ForensicSubmissionPersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * The data needed to create a ForensicSubmissionPerson.
     */
    data: XOR<ForensicSubmissionPersonCreateInput, ForensicSubmissionPersonUncheckedCreateInput>
  }

  /**
   * ForensicSubmissionPerson createMany
   */
  export type ForensicSubmissionPersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForensicSubmissionPeople.
     */
    data: ForensicSubmissionPersonCreateManyInput | ForensicSubmissionPersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForensicSubmissionPerson createManyAndReturn
   */
  export type ForensicSubmissionPersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * The data used to create many ForensicSubmissionPeople.
     */
    data: ForensicSubmissionPersonCreateManyInput | ForensicSubmissionPersonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForensicSubmissionPerson update
   */
  export type ForensicSubmissionPersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * The data needed to update a ForensicSubmissionPerson.
     */
    data: XOR<ForensicSubmissionPersonUpdateInput, ForensicSubmissionPersonUncheckedUpdateInput>
    /**
     * Choose, which ForensicSubmissionPerson to update.
     */
    where: ForensicSubmissionPersonWhereUniqueInput
  }

  /**
   * ForensicSubmissionPerson updateMany
   */
  export type ForensicSubmissionPersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForensicSubmissionPeople.
     */
    data: XOR<ForensicSubmissionPersonUpdateManyMutationInput, ForensicSubmissionPersonUncheckedUpdateManyInput>
    /**
     * Filter which ForensicSubmissionPeople to update
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * Limit how many ForensicSubmissionPeople to update.
     */
    limit?: number
  }

  /**
   * ForensicSubmissionPerson updateManyAndReturn
   */
  export type ForensicSubmissionPersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * The data used to update ForensicSubmissionPeople.
     */
    data: XOR<ForensicSubmissionPersonUpdateManyMutationInput, ForensicSubmissionPersonUncheckedUpdateManyInput>
    /**
     * Filter which ForensicSubmissionPeople to update
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * Limit how many ForensicSubmissionPeople to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForensicSubmissionPerson upsert
   */
  export type ForensicSubmissionPersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * The filter to search for the ForensicSubmissionPerson to update in case it exists.
     */
    where: ForensicSubmissionPersonWhereUniqueInput
    /**
     * In case the ForensicSubmissionPerson found by the `where` argument doesn't exist, create a new ForensicSubmissionPerson with this data.
     */
    create: XOR<ForensicSubmissionPersonCreateInput, ForensicSubmissionPersonUncheckedCreateInput>
    /**
     * In case the ForensicSubmissionPerson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForensicSubmissionPersonUpdateInput, ForensicSubmissionPersonUncheckedUpdateInput>
  }

  /**
   * ForensicSubmissionPerson delete
   */
  export type ForensicSubmissionPersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
    /**
     * Filter which ForensicSubmissionPerson to delete.
     */
    where: ForensicSubmissionPersonWhereUniqueInput
  }

  /**
   * ForensicSubmissionPerson deleteMany
   */
  export type ForensicSubmissionPersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForensicSubmissionPeople to delete
     */
    where?: ForensicSubmissionPersonWhereInput
    /**
     * Limit how many ForensicSubmissionPeople to delete.
     */
    limit?: number
  }

  /**
   * ForensicSubmissionPerson without action
   */
  export type ForensicSubmissionPersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionPerson
     */
    select?: ForensicSubmissionPersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionPerson
     */
    omit?: ForensicSubmissionPersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionPersonInclude<ExtArgs> | null
  }


  /**
   * Model ForensicSubmissionStatusHistory
   */

  export type AggregateForensicSubmissionStatusHistory = {
    _count: ForensicSubmissionStatusHistoryCountAggregateOutputType | null
    _avg: ForensicSubmissionStatusHistoryAvgAggregateOutputType | null
    _sum: ForensicSubmissionStatusHistorySumAggregateOutputType | null
    _min: ForensicSubmissionStatusHistoryMinAggregateOutputType | null
    _max: ForensicSubmissionStatusHistoryMaxAggregateOutputType | null
  }

  export type ForensicSubmissionStatusHistoryAvgAggregateOutputType = {
    oldStatus: number | null
    newStatus: number | null
  }

  export type ForensicSubmissionStatusHistorySumAggregateOutputType = {
    oldStatus: number | null
    newStatus: number | null
  }

  export type ForensicSubmissionStatusHistoryMinAggregateOutputType = {
    historyId: string | null
    submissionId: string | null
    oldStatus: number | null
    newStatus: number | null
    remark: string | null
    changedBy: string | null
    changedAt: Date | null
  }

  export type ForensicSubmissionStatusHistoryMaxAggregateOutputType = {
    historyId: string | null
    submissionId: string | null
    oldStatus: number | null
    newStatus: number | null
    remark: string | null
    changedBy: string | null
    changedAt: Date | null
  }

  export type ForensicSubmissionStatusHistoryCountAggregateOutputType = {
    historyId: number
    submissionId: number
    oldStatus: number
    newStatus: number
    remark: number
    changedBy: number
    changedAt: number
    _all: number
  }


  export type ForensicSubmissionStatusHistoryAvgAggregateInputType = {
    oldStatus?: true
    newStatus?: true
  }

  export type ForensicSubmissionStatusHistorySumAggregateInputType = {
    oldStatus?: true
    newStatus?: true
  }

  export type ForensicSubmissionStatusHistoryMinAggregateInputType = {
    historyId?: true
    submissionId?: true
    oldStatus?: true
    newStatus?: true
    remark?: true
    changedBy?: true
    changedAt?: true
  }

  export type ForensicSubmissionStatusHistoryMaxAggregateInputType = {
    historyId?: true
    submissionId?: true
    oldStatus?: true
    newStatus?: true
    remark?: true
    changedBy?: true
    changedAt?: true
  }

  export type ForensicSubmissionStatusHistoryCountAggregateInputType = {
    historyId?: true
    submissionId?: true
    oldStatus?: true
    newStatus?: true
    remark?: true
    changedBy?: true
    changedAt?: true
    _all?: true
  }

  export type ForensicSubmissionStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForensicSubmissionStatusHistory to aggregate.
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionStatusHistories to fetch.
     */
    orderBy?: ForensicSubmissionStatusHistoryOrderByWithRelationInput | ForensicSubmissionStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForensicSubmissionStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForensicSubmissionStatusHistories
    **/
    _count?: true | ForensicSubmissionStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForensicSubmissionStatusHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForensicSubmissionStatusHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForensicSubmissionStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForensicSubmissionStatusHistoryMaxAggregateInputType
  }

  export type GetForensicSubmissionStatusHistoryAggregateType<T extends ForensicSubmissionStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateForensicSubmissionStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForensicSubmissionStatusHistory[P]>
      : GetScalarType<T[P], AggregateForensicSubmissionStatusHistory[P]>
  }




  export type ForensicSubmissionStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForensicSubmissionStatusHistoryWhereInput
    orderBy?: ForensicSubmissionStatusHistoryOrderByWithAggregationInput | ForensicSubmissionStatusHistoryOrderByWithAggregationInput[]
    by: ForensicSubmissionStatusHistoryScalarFieldEnum[] | ForensicSubmissionStatusHistoryScalarFieldEnum
    having?: ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForensicSubmissionStatusHistoryCountAggregateInputType | true
    _avg?: ForensicSubmissionStatusHistoryAvgAggregateInputType
    _sum?: ForensicSubmissionStatusHistorySumAggregateInputType
    _min?: ForensicSubmissionStatusHistoryMinAggregateInputType
    _max?: ForensicSubmissionStatusHistoryMaxAggregateInputType
  }

  export type ForensicSubmissionStatusHistoryGroupByOutputType = {
    historyId: string
    submissionId: string
    oldStatus: number
    newStatus: number
    remark: string | null
    changedBy: string | null
    changedAt: Date
    _count: ForensicSubmissionStatusHistoryCountAggregateOutputType | null
    _avg: ForensicSubmissionStatusHistoryAvgAggregateOutputType | null
    _sum: ForensicSubmissionStatusHistorySumAggregateOutputType | null
    _min: ForensicSubmissionStatusHistoryMinAggregateOutputType | null
    _max: ForensicSubmissionStatusHistoryMaxAggregateOutputType | null
  }

  type GetForensicSubmissionStatusHistoryGroupByPayload<T extends ForensicSubmissionStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForensicSubmissionStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForensicSubmissionStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForensicSubmissionStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ForensicSubmissionStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ForensicSubmissionStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    submissionId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    remark?: boolean
    changedBy?: boolean
    changedAt?: boolean
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmissionStatusHistory"]>

  export type ForensicSubmissionStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    submissionId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    remark?: boolean
    changedBy?: boolean
    changedAt?: boolean
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmissionStatusHistory"]>

  export type ForensicSubmissionStatusHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    submissionId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    remark?: boolean
    changedBy?: boolean
    changedAt?: boolean
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forensicSubmissionStatusHistory"]>

  export type ForensicSubmissionStatusHistorySelectScalar = {
    historyId?: boolean
    submissionId?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    remark?: boolean
    changedBy?: boolean
    changedAt?: boolean
  }

  export type ForensicSubmissionStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"historyId" | "submissionId" | "oldStatus" | "newStatus" | "remark" | "changedBy" | "changedAt", ExtArgs["result"]["forensicSubmissionStatusHistory"]>
  export type ForensicSubmissionStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
  }
  export type ForensicSubmissionStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
  }
  export type ForensicSubmissionStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | ForensicSubmissionDefaultArgs<ExtArgs>
  }

  export type $ForensicSubmissionStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForensicSubmissionStatusHistory"
    objects: {
      submission: Prisma.$ForensicSubmissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      historyId: string
      submissionId: string
      oldStatus: number
      newStatus: number
      remark: string | null
      changedBy: string | null
      changedAt: Date
    }, ExtArgs["result"]["forensicSubmissionStatusHistory"]>
    composites: {}
  }

  type ForensicSubmissionStatusHistoryGetPayload<S extends boolean | null | undefined | ForensicSubmissionStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload, S>

  type ForensicSubmissionStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForensicSubmissionStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForensicSubmissionStatusHistoryCountAggregateInputType | true
    }

  export interface ForensicSubmissionStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForensicSubmissionStatusHistory'], meta: { name: 'ForensicSubmissionStatusHistory' } }
    /**
     * Find zero or one ForensicSubmissionStatusHistory that matches the filter.
     * @param {ForensicSubmissionStatusHistoryFindUniqueArgs} args - Arguments to find a ForensicSubmissionStatusHistory
     * @example
     * // Get one ForensicSubmissionStatusHistory
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForensicSubmissionStatusHistoryFindUniqueArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForensicSubmissionStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForensicSubmissionStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a ForensicSubmissionStatusHistory
     * @example
     * // Get one ForensicSubmissionStatusHistory
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForensicSubmissionStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForensicSubmissionStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryFindFirstArgs} args - Arguments to find a ForensicSubmissionStatusHistory
     * @example
     * // Get one ForensicSubmissionStatusHistory
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForensicSubmissionStatusHistoryFindFirstArgs>(args?: SelectSubset<T, ForensicSubmissionStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForensicSubmissionStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a ForensicSubmissionStatusHistory
     * @example
     * // Get one ForensicSubmissionStatusHistory
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForensicSubmissionStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ForensicSubmissionStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForensicSubmissionStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForensicSubmissionStatusHistories
     * const forensicSubmissionStatusHistories = await prisma.forensicSubmissionStatusHistory.findMany()
     * 
     * // Get first 10 ForensicSubmissionStatusHistories
     * const forensicSubmissionStatusHistories = await prisma.forensicSubmissionStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `historyId`
     * const forensicSubmissionStatusHistoryWithHistoryIdOnly = await prisma.forensicSubmissionStatusHistory.findMany({ select: { historyId: true } })
     * 
     */
    findMany<T extends ForensicSubmissionStatusHistoryFindManyArgs>(args?: SelectSubset<T, ForensicSubmissionStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForensicSubmissionStatusHistory.
     * @param {ForensicSubmissionStatusHistoryCreateArgs} args - Arguments to create a ForensicSubmissionStatusHistory.
     * @example
     * // Create one ForensicSubmissionStatusHistory
     * const ForensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.create({
     *   data: {
     *     // ... data to create a ForensicSubmissionStatusHistory
     *   }
     * })
     * 
     */
    create<T extends ForensicSubmissionStatusHistoryCreateArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryCreateArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForensicSubmissionStatusHistories.
     * @param {ForensicSubmissionStatusHistoryCreateManyArgs} args - Arguments to create many ForensicSubmissionStatusHistories.
     * @example
     * // Create many ForensicSubmissionStatusHistories
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForensicSubmissionStatusHistoryCreateManyArgs>(args?: SelectSubset<T, ForensicSubmissionStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForensicSubmissionStatusHistories and returns the data saved in the database.
     * @param {ForensicSubmissionStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many ForensicSubmissionStatusHistories.
     * @example
     * // Create many ForensicSubmissionStatusHistories
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForensicSubmissionStatusHistories and only return the `historyId`
     * const forensicSubmissionStatusHistoryWithHistoryIdOnly = await prisma.forensicSubmissionStatusHistory.createManyAndReturn({
     *   select: { historyId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForensicSubmissionStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ForensicSubmissionStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForensicSubmissionStatusHistory.
     * @param {ForensicSubmissionStatusHistoryDeleteArgs} args - Arguments to delete one ForensicSubmissionStatusHistory.
     * @example
     * // Delete one ForensicSubmissionStatusHistory
     * const ForensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one ForensicSubmissionStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends ForensicSubmissionStatusHistoryDeleteArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryDeleteArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForensicSubmissionStatusHistory.
     * @param {ForensicSubmissionStatusHistoryUpdateArgs} args - Arguments to update one ForensicSubmissionStatusHistory.
     * @example
     * // Update one ForensicSubmissionStatusHistory
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForensicSubmissionStatusHistoryUpdateArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryUpdateArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForensicSubmissionStatusHistories.
     * @param {ForensicSubmissionStatusHistoryDeleteManyArgs} args - Arguments to filter ForensicSubmissionStatusHistories to delete.
     * @example
     * // Delete a few ForensicSubmissionStatusHistories
     * const { count } = await prisma.forensicSubmissionStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForensicSubmissionStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, ForensicSubmissionStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForensicSubmissionStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForensicSubmissionStatusHistories
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForensicSubmissionStatusHistoryUpdateManyArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForensicSubmissionStatusHistories and returns the data updated in the database.
     * @param {ForensicSubmissionStatusHistoryUpdateManyAndReturnArgs} args - Arguments to update many ForensicSubmissionStatusHistories.
     * @example
     * // Update many ForensicSubmissionStatusHistories
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForensicSubmissionStatusHistories and only return the `historyId`
     * const forensicSubmissionStatusHistoryWithHistoryIdOnly = await prisma.forensicSubmissionStatusHistory.updateManyAndReturn({
     *   select: { historyId: true },
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
    updateManyAndReturn<T extends ForensicSubmissionStatusHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForensicSubmissionStatusHistory.
     * @param {ForensicSubmissionStatusHistoryUpsertArgs} args - Arguments to update or create a ForensicSubmissionStatusHistory.
     * @example
     * // Update or create a ForensicSubmissionStatusHistory
     * const forensicSubmissionStatusHistory = await prisma.forensicSubmissionStatusHistory.upsert({
     *   create: {
     *     // ... data to create a ForensicSubmissionStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForensicSubmissionStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends ForensicSubmissionStatusHistoryUpsertArgs>(args: SelectSubset<T, ForensicSubmissionStatusHistoryUpsertArgs<ExtArgs>>): Prisma__ForensicSubmissionStatusHistoryClient<$Result.GetResult<Prisma.$ForensicSubmissionStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForensicSubmissionStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryCountArgs} args - Arguments to filter ForensicSubmissionStatusHistories to count.
     * @example
     * // Count the number of ForensicSubmissionStatusHistories
     * const count = await prisma.forensicSubmissionStatusHistory.count({
     *   where: {
     *     // ... the filter for the ForensicSubmissionStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends ForensicSubmissionStatusHistoryCountArgs>(
      args?: Subset<T, ForensicSubmissionStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForensicSubmissionStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForensicSubmissionStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ForensicSubmissionStatusHistoryAggregateArgs>(args: Subset<T, ForensicSubmissionStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetForensicSubmissionStatusHistoryAggregateType<T>>

    /**
     * Group by ForensicSubmissionStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForensicSubmissionStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends ForensicSubmissionStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForensicSubmissionStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ForensicSubmissionStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ForensicSubmissionStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForensicSubmissionStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForensicSubmissionStatusHistory model
   */
  readonly fields: ForensicSubmissionStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForensicSubmissionStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForensicSubmissionStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submission<T extends ForensicSubmissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForensicSubmissionDefaultArgs<ExtArgs>>): Prisma__ForensicSubmissionClient<$Result.GetResult<Prisma.$ForensicSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ForensicSubmissionStatusHistory model
   */
  interface ForensicSubmissionStatusHistoryFieldRefs {
    readonly historyId: FieldRef<"ForensicSubmissionStatusHistory", 'String'>
    readonly submissionId: FieldRef<"ForensicSubmissionStatusHistory", 'String'>
    readonly oldStatus: FieldRef<"ForensicSubmissionStatusHistory", 'Int'>
    readonly newStatus: FieldRef<"ForensicSubmissionStatusHistory", 'Int'>
    readonly remark: FieldRef<"ForensicSubmissionStatusHistory", 'String'>
    readonly changedBy: FieldRef<"ForensicSubmissionStatusHistory", 'String'>
    readonly changedAt: FieldRef<"ForensicSubmissionStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForensicSubmissionStatusHistory findUnique
   */
  export type ForensicSubmissionStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionStatusHistory to fetch.
     */
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
  }

  /**
   * ForensicSubmissionStatusHistory findUniqueOrThrow
   */
  export type ForensicSubmissionStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionStatusHistory to fetch.
     */
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
  }

  /**
   * ForensicSubmissionStatusHistory findFirst
   */
  export type ForensicSubmissionStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionStatusHistory to fetch.
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionStatusHistories to fetch.
     */
    orderBy?: ForensicSubmissionStatusHistoryOrderByWithRelationInput | ForensicSubmissionStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForensicSubmissionStatusHistories.
     */
    cursor?: ForensicSubmissionStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissionStatusHistories.
     */
    distinct?: ForensicSubmissionStatusHistoryScalarFieldEnum | ForensicSubmissionStatusHistoryScalarFieldEnum[]
  }

  /**
   * ForensicSubmissionStatusHistory findFirstOrThrow
   */
  export type ForensicSubmissionStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionStatusHistory to fetch.
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionStatusHistories to fetch.
     */
    orderBy?: ForensicSubmissionStatusHistoryOrderByWithRelationInput | ForensicSubmissionStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForensicSubmissionStatusHistories.
     */
    cursor?: ForensicSubmissionStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissionStatusHistories.
     */
    distinct?: ForensicSubmissionStatusHistoryScalarFieldEnum | ForensicSubmissionStatusHistoryScalarFieldEnum[]
  }

  /**
   * ForensicSubmissionStatusHistory findMany
   */
  export type ForensicSubmissionStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ForensicSubmissionStatusHistories to fetch.
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForensicSubmissionStatusHistories to fetch.
     */
    orderBy?: ForensicSubmissionStatusHistoryOrderByWithRelationInput | ForensicSubmissionStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForensicSubmissionStatusHistories.
     */
    cursor?: ForensicSubmissionStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForensicSubmissionStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForensicSubmissionStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForensicSubmissionStatusHistories.
     */
    distinct?: ForensicSubmissionStatusHistoryScalarFieldEnum | ForensicSubmissionStatusHistoryScalarFieldEnum[]
  }

  /**
   * ForensicSubmissionStatusHistory create
   */
  export type ForensicSubmissionStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ForensicSubmissionStatusHistory.
     */
    data: XOR<ForensicSubmissionStatusHistoryCreateInput, ForensicSubmissionStatusHistoryUncheckedCreateInput>
  }

  /**
   * ForensicSubmissionStatusHistory createMany
   */
  export type ForensicSubmissionStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForensicSubmissionStatusHistories.
     */
    data: ForensicSubmissionStatusHistoryCreateManyInput | ForensicSubmissionStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForensicSubmissionStatusHistory createManyAndReturn
   */
  export type ForensicSubmissionStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many ForensicSubmissionStatusHistories.
     */
    data: ForensicSubmissionStatusHistoryCreateManyInput | ForensicSubmissionStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForensicSubmissionStatusHistory update
   */
  export type ForensicSubmissionStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ForensicSubmissionStatusHistory.
     */
    data: XOR<ForensicSubmissionStatusHistoryUpdateInput, ForensicSubmissionStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which ForensicSubmissionStatusHistory to update.
     */
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
  }

  /**
   * ForensicSubmissionStatusHistory updateMany
   */
  export type ForensicSubmissionStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForensicSubmissionStatusHistories.
     */
    data: XOR<ForensicSubmissionStatusHistoryUpdateManyMutationInput, ForensicSubmissionStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ForensicSubmissionStatusHistories to update
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * Limit how many ForensicSubmissionStatusHistories to update.
     */
    limit?: number
  }

  /**
   * ForensicSubmissionStatusHistory updateManyAndReturn
   */
  export type ForensicSubmissionStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to update ForensicSubmissionStatusHistories.
     */
    data: XOR<ForensicSubmissionStatusHistoryUpdateManyMutationInput, ForensicSubmissionStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ForensicSubmissionStatusHistories to update
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * Limit how many ForensicSubmissionStatusHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForensicSubmissionStatusHistory upsert
   */
  export type ForensicSubmissionStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ForensicSubmissionStatusHistory to update in case it exists.
     */
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
    /**
     * In case the ForensicSubmissionStatusHistory found by the `where` argument doesn't exist, create a new ForensicSubmissionStatusHistory with this data.
     */
    create: XOR<ForensicSubmissionStatusHistoryCreateInput, ForensicSubmissionStatusHistoryUncheckedCreateInput>
    /**
     * In case the ForensicSubmissionStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForensicSubmissionStatusHistoryUpdateInput, ForensicSubmissionStatusHistoryUncheckedUpdateInput>
  }

  /**
   * ForensicSubmissionStatusHistory delete
   */
  export type ForensicSubmissionStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which ForensicSubmissionStatusHistory to delete.
     */
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
  }

  /**
   * ForensicSubmissionStatusHistory deleteMany
   */
  export type ForensicSubmissionStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForensicSubmissionStatusHistories to delete
     */
    where?: ForensicSubmissionStatusHistoryWhereInput
    /**
     * Limit how many ForensicSubmissionStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * ForensicSubmissionStatusHistory without action
   */
  export type ForensicSubmissionStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForensicSubmissionStatusHistory
     */
    select?: ForensicSubmissionStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForensicSubmissionStatusHistory
     */
    omit?: ForensicSubmissionStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForensicSubmissionStatusHistoryInclude<ExtArgs> | null
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


  export const AdminScalarFieldEnum: {
    adminId: 'adminId',
    username: 'username',
    password: 'password',
    name: 'name',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const OrganizationCommanderScalarFieldEnum: {
    commanderId: 'commanderId',
    organizationId: 'organizationId',
    rank: 'rank',
    fullRank: 'fullRank',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    fullNameWithRank: 'fullNameWithRank',
    position: 'position',
    fullPosition: 'fullPosition',
    signatureImage: 'signatureImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationCommanderScalarFieldEnum = (typeof OrganizationCommanderScalarFieldEnum)[keyof typeof OrganizationCommanderScalarFieldEnum]


  export const OrganizationFinanceScalarFieldEnum: {
    financeId: 'financeId',
    organizationId: 'organizationId',
    rank: 'rank',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    fullNameWithRank: 'fullNameWithRank',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationFinanceScalarFieldEnum = (typeof OrganizationFinanceScalarFieldEnum)[keyof typeof OrganizationFinanceScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    organizationId: 'organizationId',
    key: 'key',
    organizationName: 'organizationName',
    rank: 'rank',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    fullNameWithRank: 'fullNameWithRank',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const PersonScalarFieldEnum: {
    personId: 'personId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    prefix: 'prefix',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    citizenId: 'citizenId',
    birthDate: 'birthDate',
    birthDay: 'birthDay',
    birthMonth: 'birthMonth',
    birthYear: 'birthYear',
    nationality: 'nationality',
    ethnicity: 'ethnicity',
    weight: 'weight',
    height: 'height',
    bodyType: 'bodyType',
    skinColor: 'skinColor',
    behavior: 'behavior',
    distinguishingMarks: 'distinguishingMarks',
    address: 'address',
    occupation: 'occupation',
    workplaceAddress: 'workplaceAddress',
    father: 'father',
    mother: 'mother',
    spouse: 'spouse',
    fingerprintDate: 'fingerprintDate',
    purpose: 'purpose',
    requestingAgency: 'requestingAgency',
    receiptBookNo: 'receiptBookNo',
    receiptNo: 'receiptNo',
    receiptDate: 'receiptDate',
    money: 'money',
    moneyText: 'moneyText',
    status: 'status',
    statusUpdatedAt: 'statusUpdatedAt',
    deleteAt: 'deleteAt',
    organizationId: 'organizationId',
    organizationName: 'organizationName',
    fullNameOrg: 'fullNameOrg',
    rank: 'rank',
    position: 'position',
    fullNameWithRank: 'fullNameWithRank',
    priority: 'priority',
    returnDate: 'returnDate'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const PersonStatusHistoryScalarFieldEnum: {
    historyId: 'historyId',
    personId: 'personId',
    oldStatus: 'oldStatus',
    newStatus: 'newStatus',
    changedAt: 'changedAt'
  };

  export type PersonStatusHistoryScalarFieldEnum = (typeof PersonStatusHistoryScalarFieldEnum)[keyof typeof PersonStatusHistoryScalarFieldEnum]


  export const RequestInfoScalarFieldEnum: {
    requestInfoId: 'requestInfoId',
    personId: 'personId',
    purpose: 'purpose',
    requestingAgency: 'requestingAgency',
    createdAt: 'createdAt'
  };

  export type RequestInfoScalarFieldEnum = (typeof RequestInfoScalarFieldEnum)[keyof typeof RequestInfoScalarFieldEnum]


  export const ReceiptScalarFieldEnum: {
    receiptId: 'receiptId',
    personId: 'personId',
    prefix: 'prefix',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    organizationId: 'organizationId',
    organizationName: 'organizationName',
    fullNameOrg: 'fullNameOrg',
    rank: 'rank',
    position: 'position',
    fullNameWithRank: 'fullNameWithRank',
    receiptBookNo: 'receiptBookNo',
    receiptNo: 'receiptNo',
    receiptDate: 'receiptDate',
    money: 'money',
    moneyText: 'moneyText',
    createdAt: 'createdAt',
    priority: 'priority'
  };

  export type ReceiptScalarFieldEnum = (typeof ReceiptScalarFieldEnum)[keyof typeof ReceiptScalarFieldEnum]


  export const ForensicSubmissionScalarFieldEnum: {
    submissionId: 'submissionId',
    submissionNo: 'submissionNo',
    submissionDate: 'submissionDate',
    createdAt: 'createdAt',
    status: 'status',
    statusUpdatedAt: 'statusUpdatedAt'
  };

  export type ForensicSubmissionScalarFieldEnum = (typeof ForensicSubmissionScalarFieldEnum)[keyof typeof ForensicSubmissionScalarFieldEnum]


  export const ForensicSubmissionPersonScalarFieldEnum: {
    id: 'id',
    submissionId: 'submissionId',
    personId: 'personId'
  };

  export type ForensicSubmissionPersonScalarFieldEnum = (typeof ForensicSubmissionPersonScalarFieldEnum)[keyof typeof ForensicSubmissionPersonScalarFieldEnum]


  export const ForensicSubmissionStatusHistoryScalarFieldEnum: {
    historyId: 'historyId',
    submissionId: 'submissionId',
    oldStatus: 'oldStatus',
    newStatus: 'newStatus',
    remark: 'remark',
    changedBy: 'changedBy',
    changedAt: 'changedAt'
  };

  export type ForensicSubmissionStatusHistoryScalarFieldEnum = (typeof ForensicSubmissionStatusHistoryScalarFieldEnum)[keyof typeof ForensicSubmissionStatusHistoryScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    adminId?: StringFilter<"Admin"> | string
    username?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    position?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Admin"> | Date | string | null
  }

  export type AdminOrderByWithRelationInput = {
    adminId?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    adminId?: string
    username?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    password?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    position?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Admin"> | Date | string | null
  }, "adminId" | "username">

  export type AdminOrderByWithAggregationInput = {
    adminId?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    adminId?: StringWithAggregatesFilter<"Admin"> | string
    username?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
    position?: StringWithAggregatesFilter<"Admin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
  }

  export type OrganizationCommanderWhereInput = {
    AND?: OrganizationCommanderWhereInput | OrganizationCommanderWhereInput[]
    OR?: OrganizationCommanderWhereInput[]
    NOT?: OrganizationCommanderWhereInput | OrganizationCommanderWhereInput[]
    commanderId?: StringFilter<"OrganizationCommander"> | string
    organizationId?: StringFilter<"OrganizationCommander"> | string
    rank?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullRank?: StringNullableFilter<"OrganizationCommander"> | string | null
    firstName?: StringNullableFilter<"OrganizationCommander"> | string | null
    lastName?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullName?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullNameWithRank?: StringNullableFilter<"OrganizationCommander"> | string | null
    position?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullPosition?: StringNullableFilter<"OrganizationCommander"> | string | null
    signatureImage?: StringNullableFilter<"OrganizationCommander"> | string | null
    createdAt?: DateTimeFilter<"OrganizationCommander"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationCommander"> | Date | string | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationCommanderOrderByWithRelationInput = {
    commanderId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrderInput | SortOrder
    fullRank?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    fullPosition?: SortOrderInput | SortOrder
    signatureImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationCommanderWhereUniqueInput = Prisma.AtLeast<{
    commanderId?: string
    organizationId?: string
    AND?: OrganizationCommanderWhereInput | OrganizationCommanderWhereInput[]
    OR?: OrganizationCommanderWhereInput[]
    NOT?: OrganizationCommanderWhereInput | OrganizationCommanderWhereInput[]
    rank?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullRank?: StringNullableFilter<"OrganizationCommander"> | string | null
    firstName?: StringNullableFilter<"OrganizationCommander"> | string | null
    lastName?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullName?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullNameWithRank?: StringNullableFilter<"OrganizationCommander"> | string | null
    position?: StringNullableFilter<"OrganizationCommander"> | string | null
    fullPosition?: StringNullableFilter<"OrganizationCommander"> | string | null
    signatureImage?: StringNullableFilter<"OrganizationCommander"> | string | null
    createdAt?: DateTimeFilter<"OrganizationCommander"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationCommander"> | Date | string | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "commanderId" | "organizationId">

  export type OrganizationCommanderOrderByWithAggregationInput = {
    commanderId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrderInput | SortOrder
    fullRank?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    fullPosition?: SortOrderInput | SortOrder
    signatureImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: OrganizationCommanderCountOrderByAggregateInput
    _max?: OrganizationCommanderMaxOrderByAggregateInput
    _min?: OrganizationCommanderMinOrderByAggregateInput
  }

  export type OrganizationCommanderScalarWhereWithAggregatesInput = {
    AND?: OrganizationCommanderScalarWhereWithAggregatesInput | OrganizationCommanderScalarWhereWithAggregatesInput[]
    OR?: OrganizationCommanderScalarWhereWithAggregatesInput[]
    NOT?: OrganizationCommanderScalarWhereWithAggregatesInput | OrganizationCommanderScalarWhereWithAggregatesInput[]
    commanderId?: StringWithAggregatesFilter<"OrganizationCommander"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationCommander"> | string
    rank?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    fullRank?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    fullNameWithRank?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    position?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    fullPosition?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    signatureImage?: StringNullableWithAggregatesFilter<"OrganizationCommander"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationCommander"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"OrganizationCommander"> | Date | string | null
  }

  export type OrganizationFinanceWhereInput = {
    AND?: OrganizationFinanceWhereInput | OrganizationFinanceWhereInput[]
    OR?: OrganizationFinanceWhereInput[]
    NOT?: OrganizationFinanceWhereInput | OrganizationFinanceWhereInput[]
    financeId?: StringFilter<"OrganizationFinance"> | string
    organizationId?: StringFilter<"OrganizationFinance"> | string
    rank?: StringNullableFilter<"OrganizationFinance"> | string | null
    firstName?: StringNullableFilter<"OrganizationFinance"> | string | null
    lastName?: StringNullableFilter<"OrganizationFinance"> | string | null
    fullName?: StringNullableFilter<"OrganizationFinance"> | string | null
    fullNameWithRank?: StringNullableFilter<"OrganizationFinance"> | string | null
    position?: StringNullableFilter<"OrganizationFinance"> | string | null
    createdAt?: DateTimeFilter<"OrganizationFinance"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationFinance"> | Date | string | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationFinanceOrderByWithRelationInput = {
    financeId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationFinanceWhereUniqueInput = Prisma.AtLeast<{
    financeId?: string
    organizationId?: string
    AND?: OrganizationFinanceWhereInput | OrganizationFinanceWhereInput[]
    OR?: OrganizationFinanceWhereInput[]
    NOT?: OrganizationFinanceWhereInput | OrganizationFinanceWhereInput[]
    rank?: StringNullableFilter<"OrganizationFinance"> | string | null
    firstName?: StringNullableFilter<"OrganizationFinance"> | string | null
    lastName?: StringNullableFilter<"OrganizationFinance"> | string | null
    fullName?: StringNullableFilter<"OrganizationFinance"> | string | null
    fullNameWithRank?: StringNullableFilter<"OrganizationFinance"> | string | null
    position?: StringNullableFilter<"OrganizationFinance"> | string | null
    createdAt?: DateTimeFilter<"OrganizationFinance"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationFinance"> | Date | string | null
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "financeId" | "organizationId">

  export type OrganizationFinanceOrderByWithAggregationInput = {
    financeId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: OrganizationFinanceCountOrderByAggregateInput
    _max?: OrganizationFinanceMaxOrderByAggregateInput
    _min?: OrganizationFinanceMinOrderByAggregateInput
  }

  export type OrganizationFinanceScalarWhereWithAggregatesInput = {
    AND?: OrganizationFinanceScalarWhereWithAggregatesInput | OrganizationFinanceScalarWhereWithAggregatesInput[]
    OR?: OrganizationFinanceScalarWhereWithAggregatesInput[]
    NOT?: OrganizationFinanceScalarWhereWithAggregatesInput | OrganizationFinanceScalarWhereWithAggregatesInput[]
    financeId?: StringWithAggregatesFilter<"OrganizationFinance"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationFinance"> | string
    rank?: StringNullableWithAggregatesFilter<"OrganizationFinance"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"OrganizationFinance"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"OrganizationFinance"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"OrganizationFinance"> | string | null
    fullNameWithRank?: StringNullableWithAggregatesFilter<"OrganizationFinance"> | string | null
    position?: StringNullableWithAggregatesFilter<"OrganizationFinance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationFinance"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"OrganizationFinance"> | Date | string | null
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    organizationId?: StringFilter<"Organization"> | string
    key?: StringFilter<"Organization"> | string
    organizationName?: StringFilter<"Organization"> | string
    rank?: StringNullableFilter<"Organization"> | string | null
    firstName?: StringFilter<"Organization"> | string
    lastName?: StringFilter<"Organization"> | string
    fullName?: StringFilter<"Organization"> | string
    fullNameWithRank?: StringFilter<"Organization"> | string
    position?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    commander?: XOR<OrganizationCommanderNullableScalarRelationFilter, OrganizationCommanderWhereInput> | null
    finance?: XOR<OrganizationFinanceNullableScalarRelationFilter, OrganizationFinanceWhereInput> | null
    persons?: PersonListRelationFilter
    receipts?: ReceiptListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    organizationId?: SortOrder
    key?: SortOrder
    organizationName?: SortOrder
    rank?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    commander?: OrganizationCommanderOrderByWithRelationInput
    finance?: OrganizationFinanceOrderByWithRelationInput
    persons?: PersonOrderByRelationAggregateInput
    receipts?: ReceiptOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    organizationId?: string
    key?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    organizationName?: StringFilter<"Organization"> | string
    rank?: StringNullableFilter<"Organization"> | string | null
    firstName?: StringFilter<"Organization"> | string
    lastName?: StringFilter<"Organization"> | string
    fullName?: StringFilter<"Organization"> | string
    fullNameWithRank?: StringFilter<"Organization"> | string
    position?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    commander?: XOR<OrganizationCommanderNullableScalarRelationFilter, OrganizationCommanderWhereInput> | null
    finance?: XOR<OrganizationFinanceNullableScalarRelationFilter, OrganizationFinanceWhereInput> | null
    persons?: PersonListRelationFilter
    receipts?: ReceiptListRelationFilter
  }, "organizationId" | "key">

  export type OrganizationOrderByWithAggregationInput = {
    organizationId?: SortOrder
    key?: SortOrder
    organizationName?: SortOrder
    rank?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    organizationId?: StringWithAggregatesFilter<"Organization"> | string
    key?: StringWithAggregatesFilter<"Organization"> | string
    organizationName?: StringWithAggregatesFilter<"Organization"> | string
    rank?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    firstName?: StringWithAggregatesFilter<"Organization"> | string
    lastName?: StringWithAggregatesFilter<"Organization"> | string
    fullName?: StringWithAggregatesFilter<"Organization"> | string
    fullNameWithRank?: StringWithAggregatesFilter<"Organization"> | string
    position?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Organization"> | Date | string | null
  }

  export type PersonWhereInput = {
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    personId?: StringFilter<"Person"> | string
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    prefix?: StringFilter<"Person"> | string
    firstName?: StringFilter<"Person"> | string
    lastName?: StringFilter<"Person"> | string
    fullName?: StringFilter<"Person"> | string
    citizenId?: StringFilter<"Person"> | string
    birthDate?: StringNullableFilter<"Person"> | string | null
    birthDay?: StringNullableFilter<"Person"> | string | null
    birthMonth?: StringNullableFilter<"Person"> | string | null
    birthYear?: StringNullableFilter<"Person"> | string | null
    nationality?: StringNullableFilter<"Person"> | string | null
    ethnicity?: StringNullableFilter<"Person"> | string | null
    weight?: IntNullableFilter<"Person"> | number | null
    height?: IntNullableFilter<"Person"> | number | null
    bodyType?: StringNullableFilter<"Person"> | string | null
    skinColor?: StringNullableFilter<"Person"> | string | null
    behavior?: StringNullableFilter<"Person"> | string | null
    distinguishingMarks?: StringNullableFilter<"Person"> | string | null
    address?: StringNullableFilter<"Person"> | string | null
    occupation?: StringNullableFilter<"Person"> | string | null
    workplaceAddress?: StringNullableFilter<"Person"> | string | null
    father?: StringNullableFilter<"Person"> | string | null
    mother?: StringNullableFilter<"Person"> | string | null
    spouse?: StringNullableFilter<"Person"> | string | null
    fingerprintDate?: StringNullableFilter<"Person"> | string | null
    purpose?: StringNullableFilter<"Person"> | string | null
    requestingAgency?: StringNullableFilter<"Person"> | string | null
    receiptBookNo?: StringNullableFilter<"Person"> | string | null
    receiptNo?: StringNullableFilter<"Person"> | string | null
    receiptDate?: StringNullableFilter<"Person"> | string | null
    money?: IntFilter<"Person"> | number
    moneyText?: StringNullableFilter<"Person"> | string | null
    status?: IntFilter<"Person"> | number
    statusUpdatedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    deleteAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    organizationId?: StringNullableFilter<"Person"> | string | null
    organizationName?: StringNullableFilter<"Person"> | string | null
    fullNameOrg?: StringNullableFilter<"Person"> | string | null
    rank?: StringNullableFilter<"Person"> | string | null
    position?: StringNullableFilter<"Person"> | string | null
    fullNameWithRank?: StringNullableFilter<"Person"> | string | null
    priority?: IntFilter<"Person"> | number
    returnDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    receipts?: ReceiptListRelationFilter
    requestInfos?: RequestInfoListRelationFilter
    statusHistories?: PersonStatusHistoryListRelationFilter
    forensicSubmissionPersons?: ForensicSubmissionPersonListRelationFilter
  }

  export type PersonOrderByWithRelationInput = {
    personId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    citizenId?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    birthDay?: SortOrderInput | SortOrder
    birthMonth?: SortOrderInput | SortOrder
    birthYear?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    ethnicity?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    bodyType?: SortOrderInput | SortOrder
    skinColor?: SortOrderInput | SortOrder
    behavior?: SortOrderInput | SortOrder
    distinguishingMarks?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    workplaceAddress?: SortOrderInput | SortOrder
    father?: SortOrderInput | SortOrder
    mother?: SortOrderInput | SortOrder
    spouse?: SortOrderInput | SortOrder
    fingerprintDate?: SortOrderInput | SortOrder
    purpose?: SortOrderInput | SortOrder
    requestingAgency?: SortOrderInput | SortOrder
    receiptBookNo?: SortOrderInput | SortOrder
    receiptNo?: SortOrderInput | SortOrder
    receiptDate?: SortOrderInput | SortOrder
    money?: SortOrder
    moneyText?: SortOrderInput | SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrderInput | SortOrder
    deleteAt?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    organizationName?: SortOrderInput | SortOrder
    fullNameOrg?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    priority?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    receipts?: ReceiptOrderByRelationAggregateInput
    requestInfos?: RequestInfoOrderByRelationAggregateInput
    statusHistories?: PersonStatusHistoryOrderByRelationAggregateInput
    forensicSubmissionPersons?: ForensicSubmissionPersonOrderByRelationAggregateInput
  }

  export type PersonWhereUniqueInput = Prisma.AtLeast<{
    personId?: string
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    prefix?: StringFilter<"Person"> | string
    firstName?: StringFilter<"Person"> | string
    lastName?: StringFilter<"Person"> | string
    fullName?: StringFilter<"Person"> | string
    citizenId?: StringFilter<"Person"> | string
    birthDate?: StringNullableFilter<"Person"> | string | null
    birthDay?: StringNullableFilter<"Person"> | string | null
    birthMonth?: StringNullableFilter<"Person"> | string | null
    birthYear?: StringNullableFilter<"Person"> | string | null
    nationality?: StringNullableFilter<"Person"> | string | null
    ethnicity?: StringNullableFilter<"Person"> | string | null
    weight?: IntNullableFilter<"Person"> | number | null
    height?: IntNullableFilter<"Person"> | number | null
    bodyType?: StringNullableFilter<"Person"> | string | null
    skinColor?: StringNullableFilter<"Person"> | string | null
    behavior?: StringNullableFilter<"Person"> | string | null
    distinguishingMarks?: StringNullableFilter<"Person"> | string | null
    address?: StringNullableFilter<"Person"> | string | null
    occupation?: StringNullableFilter<"Person"> | string | null
    workplaceAddress?: StringNullableFilter<"Person"> | string | null
    father?: StringNullableFilter<"Person"> | string | null
    mother?: StringNullableFilter<"Person"> | string | null
    spouse?: StringNullableFilter<"Person"> | string | null
    fingerprintDate?: StringNullableFilter<"Person"> | string | null
    purpose?: StringNullableFilter<"Person"> | string | null
    requestingAgency?: StringNullableFilter<"Person"> | string | null
    receiptBookNo?: StringNullableFilter<"Person"> | string | null
    receiptNo?: StringNullableFilter<"Person"> | string | null
    receiptDate?: StringNullableFilter<"Person"> | string | null
    money?: IntFilter<"Person"> | number
    moneyText?: StringNullableFilter<"Person"> | string | null
    status?: IntFilter<"Person"> | number
    statusUpdatedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    deleteAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    organizationId?: StringNullableFilter<"Person"> | string | null
    organizationName?: StringNullableFilter<"Person"> | string | null
    fullNameOrg?: StringNullableFilter<"Person"> | string | null
    rank?: StringNullableFilter<"Person"> | string | null
    position?: StringNullableFilter<"Person"> | string | null
    fullNameWithRank?: StringNullableFilter<"Person"> | string | null
    priority?: IntFilter<"Person"> | number
    returnDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    receipts?: ReceiptListRelationFilter
    requestInfos?: RequestInfoListRelationFilter
    statusHistories?: PersonStatusHistoryListRelationFilter
    forensicSubmissionPersons?: ForensicSubmissionPersonListRelationFilter
  }, "personId">

  export type PersonOrderByWithAggregationInput = {
    personId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    citizenId?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    birthDay?: SortOrderInput | SortOrder
    birthMonth?: SortOrderInput | SortOrder
    birthYear?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    ethnicity?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    bodyType?: SortOrderInput | SortOrder
    skinColor?: SortOrderInput | SortOrder
    behavior?: SortOrderInput | SortOrder
    distinguishingMarks?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    workplaceAddress?: SortOrderInput | SortOrder
    father?: SortOrderInput | SortOrder
    mother?: SortOrderInput | SortOrder
    spouse?: SortOrderInput | SortOrder
    fingerprintDate?: SortOrderInput | SortOrder
    purpose?: SortOrderInput | SortOrder
    requestingAgency?: SortOrderInput | SortOrder
    receiptBookNo?: SortOrderInput | SortOrder
    receiptNo?: SortOrderInput | SortOrder
    receiptDate?: SortOrderInput | SortOrder
    money?: SortOrder
    moneyText?: SortOrderInput | SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrderInput | SortOrder
    deleteAt?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    organizationName?: SortOrderInput | SortOrder
    fullNameOrg?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    priority?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    _count?: PersonCountOrderByAggregateInput
    _avg?: PersonAvgOrderByAggregateInput
    _max?: PersonMaxOrderByAggregateInput
    _min?: PersonMinOrderByAggregateInput
    _sum?: PersonSumOrderByAggregateInput
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    OR?: PersonScalarWhereWithAggregatesInput[]
    NOT?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    personId?: StringWithAggregatesFilter<"Person"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    prefix?: StringWithAggregatesFilter<"Person"> | string
    firstName?: StringWithAggregatesFilter<"Person"> | string
    lastName?: StringWithAggregatesFilter<"Person"> | string
    fullName?: StringWithAggregatesFilter<"Person"> | string
    citizenId?: StringWithAggregatesFilter<"Person"> | string
    birthDate?: StringNullableWithAggregatesFilter<"Person"> | string | null
    birthDay?: StringNullableWithAggregatesFilter<"Person"> | string | null
    birthMonth?: StringNullableWithAggregatesFilter<"Person"> | string | null
    birthYear?: StringNullableWithAggregatesFilter<"Person"> | string | null
    nationality?: StringNullableWithAggregatesFilter<"Person"> | string | null
    ethnicity?: StringNullableWithAggregatesFilter<"Person"> | string | null
    weight?: IntNullableWithAggregatesFilter<"Person"> | number | null
    height?: IntNullableWithAggregatesFilter<"Person"> | number | null
    bodyType?: StringNullableWithAggregatesFilter<"Person"> | string | null
    skinColor?: StringNullableWithAggregatesFilter<"Person"> | string | null
    behavior?: StringNullableWithAggregatesFilter<"Person"> | string | null
    distinguishingMarks?: StringNullableWithAggregatesFilter<"Person"> | string | null
    address?: StringNullableWithAggregatesFilter<"Person"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"Person"> | string | null
    workplaceAddress?: StringNullableWithAggregatesFilter<"Person"> | string | null
    father?: StringNullableWithAggregatesFilter<"Person"> | string | null
    mother?: StringNullableWithAggregatesFilter<"Person"> | string | null
    spouse?: StringNullableWithAggregatesFilter<"Person"> | string | null
    fingerprintDate?: StringNullableWithAggregatesFilter<"Person"> | string | null
    purpose?: StringNullableWithAggregatesFilter<"Person"> | string | null
    requestingAgency?: StringNullableWithAggregatesFilter<"Person"> | string | null
    receiptBookNo?: StringNullableWithAggregatesFilter<"Person"> | string | null
    receiptNo?: StringNullableWithAggregatesFilter<"Person"> | string | null
    receiptDate?: StringNullableWithAggregatesFilter<"Person"> | string | null
    money?: IntWithAggregatesFilter<"Person"> | number
    moneyText?: StringNullableWithAggregatesFilter<"Person"> | string | null
    status?: IntWithAggregatesFilter<"Person"> | number
    statusUpdatedAt?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    deleteAt?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    organizationId?: StringNullableWithAggregatesFilter<"Person"> | string | null
    organizationName?: StringNullableWithAggregatesFilter<"Person"> | string | null
    fullNameOrg?: StringNullableWithAggregatesFilter<"Person"> | string | null
    rank?: StringNullableWithAggregatesFilter<"Person"> | string | null
    position?: StringNullableWithAggregatesFilter<"Person"> | string | null
    fullNameWithRank?: StringNullableWithAggregatesFilter<"Person"> | string | null
    priority?: IntWithAggregatesFilter<"Person"> | number
    returnDate?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
  }

  export type PersonStatusHistoryWhereInput = {
    AND?: PersonStatusHistoryWhereInput | PersonStatusHistoryWhereInput[]
    OR?: PersonStatusHistoryWhereInput[]
    NOT?: PersonStatusHistoryWhereInput | PersonStatusHistoryWhereInput[]
    historyId?: StringFilter<"PersonStatusHistory"> | string
    personId?: StringFilter<"PersonStatusHistory"> | string
    oldStatus?: IntFilter<"PersonStatusHistory"> | number
    newStatus?: IntFilter<"PersonStatusHistory"> | number
    changedAt?: DateTimeFilter<"PersonStatusHistory"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type PersonStatusHistoryOrderByWithRelationInput = {
    historyId?: SortOrder
    personId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    changedAt?: SortOrder
    person?: PersonOrderByWithRelationInput
  }

  export type PersonStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    historyId?: string
    AND?: PersonStatusHistoryWhereInput | PersonStatusHistoryWhereInput[]
    OR?: PersonStatusHistoryWhereInput[]
    NOT?: PersonStatusHistoryWhereInput | PersonStatusHistoryWhereInput[]
    personId?: StringFilter<"PersonStatusHistory"> | string
    oldStatus?: IntFilter<"PersonStatusHistory"> | number
    newStatus?: IntFilter<"PersonStatusHistory"> | number
    changedAt?: DateTimeFilter<"PersonStatusHistory"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "historyId">

  export type PersonStatusHistoryOrderByWithAggregationInput = {
    historyId?: SortOrder
    personId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    changedAt?: SortOrder
    _count?: PersonStatusHistoryCountOrderByAggregateInput
    _avg?: PersonStatusHistoryAvgOrderByAggregateInput
    _max?: PersonStatusHistoryMaxOrderByAggregateInput
    _min?: PersonStatusHistoryMinOrderByAggregateInput
    _sum?: PersonStatusHistorySumOrderByAggregateInput
  }

  export type PersonStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: PersonStatusHistoryScalarWhereWithAggregatesInput | PersonStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: PersonStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: PersonStatusHistoryScalarWhereWithAggregatesInput | PersonStatusHistoryScalarWhereWithAggregatesInput[]
    historyId?: StringWithAggregatesFilter<"PersonStatusHistory"> | string
    personId?: StringWithAggregatesFilter<"PersonStatusHistory"> | string
    oldStatus?: IntWithAggregatesFilter<"PersonStatusHistory"> | number
    newStatus?: IntWithAggregatesFilter<"PersonStatusHistory"> | number
    changedAt?: DateTimeWithAggregatesFilter<"PersonStatusHistory"> | Date | string
  }

  export type RequestInfoWhereInput = {
    AND?: RequestInfoWhereInput | RequestInfoWhereInput[]
    OR?: RequestInfoWhereInput[]
    NOT?: RequestInfoWhereInput | RequestInfoWhereInput[]
    requestInfoId?: StringFilter<"RequestInfo"> | string
    personId?: StringFilter<"RequestInfo"> | string
    purpose?: StringNullableFilter<"RequestInfo"> | string | null
    requestingAgency?: StringNullableFilter<"RequestInfo"> | string | null
    createdAt?: DateTimeFilter<"RequestInfo"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type RequestInfoOrderByWithRelationInput = {
    requestInfoId?: SortOrder
    personId?: SortOrder
    purpose?: SortOrderInput | SortOrder
    requestingAgency?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    person?: PersonOrderByWithRelationInput
  }

  export type RequestInfoWhereUniqueInput = Prisma.AtLeast<{
    requestInfoId?: string
    AND?: RequestInfoWhereInput | RequestInfoWhereInput[]
    OR?: RequestInfoWhereInput[]
    NOT?: RequestInfoWhereInput | RequestInfoWhereInput[]
    personId?: StringFilter<"RequestInfo"> | string
    purpose?: StringNullableFilter<"RequestInfo"> | string | null
    requestingAgency?: StringNullableFilter<"RequestInfo"> | string | null
    createdAt?: DateTimeFilter<"RequestInfo"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "requestInfoId">

  export type RequestInfoOrderByWithAggregationInput = {
    requestInfoId?: SortOrder
    personId?: SortOrder
    purpose?: SortOrderInput | SortOrder
    requestingAgency?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestInfoCountOrderByAggregateInput
    _max?: RequestInfoMaxOrderByAggregateInput
    _min?: RequestInfoMinOrderByAggregateInput
  }

  export type RequestInfoScalarWhereWithAggregatesInput = {
    AND?: RequestInfoScalarWhereWithAggregatesInput | RequestInfoScalarWhereWithAggregatesInput[]
    OR?: RequestInfoScalarWhereWithAggregatesInput[]
    NOT?: RequestInfoScalarWhereWithAggregatesInput | RequestInfoScalarWhereWithAggregatesInput[]
    requestInfoId?: StringWithAggregatesFilter<"RequestInfo"> | string
    personId?: StringWithAggregatesFilter<"RequestInfo"> | string
    purpose?: StringNullableWithAggregatesFilter<"RequestInfo"> | string | null
    requestingAgency?: StringNullableWithAggregatesFilter<"RequestInfo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestInfo"> | Date | string
  }

  export type ReceiptWhereInput = {
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    receiptId?: StringFilter<"Receipt"> | string
    personId?: StringNullableFilter<"Receipt"> | string | null
    prefix?: StringFilter<"Receipt"> | string
    firstName?: StringFilter<"Receipt"> | string
    lastName?: StringFilter<"Receipt"> | string
    fullName?: StringFilter<"Receipt"> | string
    organizationId?: StringNullableFilter<"Receipt"> | string | null
    organizationName?: StringNullableFilter<"Receipt"> | string | null
    fullNameOrg?: StringNullableFilter<"Receipt"> | string | null
    rank?: StringNullableFilter<"Receipt"> | string | null
    position?: StringNullableFilter<"Receipt"> | string | null
    fullNameWithRank?: StringNullableFilter<"Receipt"> | string | null
    receiptBookNo?: StringNullableFilter<"Receipt"> | string | null
    receiptNo?: StringNullableFilter<"Receipt"> | string | null
    receiptDate?: StringNullableFilter<"Receipt"> | string | null
    money?: IntFilter<"Receipt"> | number
    moneyText?: StringNullableFilter<"Receipt"> | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    priority?: IntFilter<"Receipt"> | number
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    person?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
  }

  export type ReceiptOrderByWithRelationInput = {
    receiptId?: SortOrder
    personId?: SortOrderInput | SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    organizationName?: SortOrderInput | SortOrder
    fullNameOrg?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    receiptBookNo?: SortOrderInput | SortOrder
    receiptNo?: SortOrderInput | SortOrder
    receiptDate?: SortOrderInput | SortOrder
    money?: SortOrder
    moneyText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    priority?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    person?: PersonOrderByWithRelationInput
  }

  export type ReceiptWhereUniqueInput = Prisma.AtLeast<{
    receiptId?: string
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    personId?: StringNullableFilter<"Receipt"> | string | null
    prefix?: StringFilter<"Receipt"> | string
    firstName?: StringFilter<"Receipt"> | string
    lastName?: StringFilter<"Receipt"> | string
    fullName?: StringFilter<"Receipt"> | string
    organizationId?: StringNullableFilter<"Receipt"> | string | null
    organizationName?: StringNullableFilter<"Receipt"> | string | null
    fullNameOrg?: StringNullableFilter<"Receipt"> | string | null
    rank?: StringNullableFilter<"Receipt"> | string | null
    position?: StringNullableFilter<"Receipt"> | string | null
    fullNameWithRank?: StringNullableFilter<"Receipt"> | string | null
    receiptBookNo?: StringNullableFilter<"Receipt"> | string | null
    receiptNo?: StringNullableFilter<"Receipt"> | string | null
    receiptDate?: StringNullableFilter<"Receipt"> | string | null
    money?: IntFilter<"Receipt"> | number
    moneyText?: StringNullableFilter<"Receipt"> | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    priority?: IntFilter<"Receipt"> | number
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    person?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
  }, "receiptId">

  export type ReceiptOrderByWithAggregationInput = {
    receiptId?: SortOrder
    personId?: SortOrderInput | SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    organizationName?: SortOrderInput | SortOrder
    fullNameOrg?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    fullNameWithRank?: SortOrderInput | SortOrder
    receiptBookNo?: SortOrderInput | SortOrder
    receiptNo?: SortOrderInput | SortOrder
    receiptDate?: SortOrderInput | SortOrder
    money?: SortOrder
    moneyText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    priority?: SortOrder
    _count?: ReceiptCountOrderByAggregateInput
    _avg?: ReceiptAvgOrderByAggregateInput
    _max?: ReceiptMaxOrderByAggregateInput
    _min?: ReceiptMinOrderByAggregateInput
    _sum?: ReceiptSumOrderByAggregateInput
  }

  export type ReceiptScalarWhereWithAggregatesInput = {
    AND?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    OR?: ReceiptScalarWhereWithAggregatesInput[]
    NOT?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    receiptId?: StringWithAggregatesFilter<"Receipt"> | string
    personId?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    prefix?: StringWithAggregatesFilter<"Receipt"> | string
    firstName?: StringWithAggregatesFilter<"Receipt"> | string
    lastName?: StringWithAggregatesFilter<"Receipt"> | string
    fullName?: StringWithAggregatesFilter<"Receipt"> | string
    organizationId?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    organizationName?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    fullNameOrg?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    rank?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    position?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    fullNameWithRank?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    receiptBookNo?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    receiptNo?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    receiptDate?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    money?: IntWithAggregatesFilter<"Receipt"> | number
    moneyText?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
    priority?: IntWithAggregatesFilter<"Receipt"> | number
  }

  export type ForensicSubmissionWhereInput = {
    AND?: ForensicSubmissionWhereInput | ForensicSubmissionWhereInput[]
    OR?: ForensicSubmissionWhereInput[]
    NOT?: ForensicSubmissionWhereInput | ForensicSubmissionWhereInput[]
    submissionId?: StringFilter<"ForensicSubmission"> | string
    submissionNo?: StringNullableFilter<"ForensicSubmission"> | string | null
    submissionDate?: DateTimeFilter<"ForensicSubmission"> | Date | string
    createdAt?: DateTimeFilter<"ForensicSubmission"> | Date | string
    status?: IntFilter<"ForensicSubmission"> | number
    statusUpdatedAt?: DateTimeNullableFilter<"ForensicSubmission"> | Date | string | null
    persons?: ForensicSubmissionPersonListRelationFilter
    statusHistories?: ForensicSubmissionStatusHistoryListRelationFilter
  }

  export type ForensicSubmissionOrderByWithRelationInput = {
    submissionId?: SortOrder
    submissionNo?: SortOrderInput | SortOrder
    submissionDate?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrderInput | SortOrder
    persons?: ForensicSubmissionPersonOrderByRelationAggregateInput
    statusHistories?: ForensicSubmissionStatusHistoryOrderByRelationAggregateInput
  }

  export type ForensicSubmissionWhereUniqueInput = Prisma.AtLeast<{
    submissionId?: string
    AND?: ForensicSubmissionWhereInput | ForensicSubmissionWhereInput[]
    OR?: ForensicSubmissionWhereInput[]
    NOT?: ForensicSubmissionWhereInput | ForensicSubmissionWhereInput[]
    submissionNo?: StringNullableFilter<"ForensicSubmission"> | string | null
    submissionDate?: DateTimeFilter<"ForensicSubmission"> | Date | string
    createdAt?: DateTimeFilter<"ForensicSubmission"> | Date | string
    status?: IntFilter<"ForensicSubmission"> | number
    statusUpdatedAt?: DateTimeNullableFilter<"ForensicSubmission"> | Date | string | null
    persons?: ForensicSubmissionPersonListRelationFilter
    statusHistories?: ForensicSubmissionStatusHistoryListRelationFilter
  }, "submissionId">

  export type ForensicSubmissionOrderByWithAggregationInput = {
    submissionId?: SortOrder
    submissionNo?: SortOrderInput | SortOrder
    submissionDate?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrderInput | SortOrder
    _count?: ForensicSubmissionCountOrderByAggregateInput
    _avg?: ForensicSubmissionAvgOrderByAggregateInput
    _max?: ForensicSubmissionMaxOrderByAggregateInput
    _min?: ForensicSubmissionMinOrderByAggregateInput
    _sum?: ForensicSubmissionSumOrderByAggregateInput
  }

  export type ForensicSubmissionScalarWhereWithAggregatesInput = {
    AND?: ForensicSubmissionScalarWhereWithAggregatesInput | ForensicSubmissionScalarWhereWithAggregatesInput[]
    OR?: ForensicSubmissionScalarWhereWithAggregatesInput[]
    NOT?: ForensicSubmissionScalarWhereWithAggregatesInput | ForensicSubmissionScalarWhereWithAggregatesInput[]
    submissionId?: StringWithAggregatesFilter<"ForensicSubmission"> | string
    submissionNo?: StringNullableWithAggregatesFilter<"ForensicSubmission"> | string | null
    submissionDate?: DateTimeWithAggregatesFilter<"ForensicSubmission"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ForensicSubmission"> | Date | string
    status?: IntWithAggregatesFilter<"ForensicSubmission"> | number
    statusUpdatedAt?: DateTimeNullableWithAggregatesFilter<"ForensicSubmission"> | Date | string | null
  }

  export type ForensicSubmissionPersonWhereInput = {
    AND?: ForensicSubmissionPersonWhereInput | ForensicSubmissionPersonWhereInput[]
    OR?: ForensicSubmissionPersonWhereInput[]
    NOT?: ForensicSubmissionPersonWhereInput | ForensicSubmissionPersonWhereInput[]
    id?: StringFilter<"ForensicSubmissionPerson"> | string
    submissionId?: StringFilter<"ForensicSubmissionPerson"> | string
    personId?: StringFilter<"ForensicSubmissionPerson"> | string
    submission?: XOR<ForensicSubmissionScalarRelationFilter, ForensicSubmissionWhereInput>
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type ForensicSubmissionPersonOrderByWithRelationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    personId?: SortOrder
    submission?: ForensicSubmissionOrderByWithRelationInput
    person?: PersonOrderByWithRelationInput
  }

  export type ForensicSubmissionPersonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    submissionId_personId?: ForensicSubmissionPersonSubmissionIdPersonIdCompoundUniqueInput
    AND?: ForensicSubmissionPersonWhereInput | ForensicSubmissionPersonWhereInput[]
    OR?: ForensicSubmissionPersonWhereInput[]
    NOT?: ForensicSubmissionPersonWhereInput | ForensicSubmissionPersonWhereInput[]
    submissionId?: StringFilter<"ForensicSubmissionPerson"> | string
    personId?: StringFilter<"ForensicSubmissionPerson"> | string
    submission?: XOR<ForensicSubmissionScalarRelationFilter, ForensicSubmissionWhereInput>
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "id" | "submissionId_personId">

  export type ForensicSubmissionPersonOrderByWithAggregationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    personId?: SortOrder
    _count?: ForensicSubmissionPersonCountOrderByAggregateInput
    _max?: ForensicSubmissionPersonMaxOrderByAggregateInput
    _min?: ForensicSubmissionPersonMinOrderByAggregateInput
  }

  export type ForensicSubmissionPersonScalarWhereWithAggregatesInput = {
    AND?: ForensicSubmissionPersonScalarWhereWithAggregatesInput | ForensicSubmissionPersonScalarWhereWithAggregatesInput[]
    OR?: ForensicSubmissionPersonScalarWhereWithAggregatesInput[]
    NOT?: ForensicSubmissionPersonScalarWhereWithAggregatesInput | ForensicSubmissionPersonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ForensicSubmissionPerson"> | string
    submissionId?: StringWithAggregatesFilter<"ForensicSubmissionPerson"> | string
    personId?: StringWithAggregatesFilter<"ForensicSubmissionPerson"> | string
  }

  export type ForensicSubmissionStatusHistoryWhereInput = {
    AND?: ForensicSubmissionStatusHistoryWhereInput | ForensicSubmissionStatusHistoryWhereInput[]
    OR?: ForensicSubmissionStatusHistoryWhereInput[]
    NOT?: ForensicSubmissionStatusHistoryWhereInput | ForensicSubmissionStatusHistoryWhereInput[]
    historyId?: StringFilter<"ForensicSubmissionStatusHistory"> | string
    submissionId?: StringFilter<"ForensicSubmissionStatusHistory"> | string
    oldStatus?: IntFilter<"ForensicSubmissionStatusHistory"> | number
    newStatus?: IntFilter<"ForensicSubmissionStatusHistory"> | number
    remark?: StringNullableFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedBy?: StringNullableFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ForensicSubmissionStatusHistory"> | Date | string
    submission?: XOR<ForensicSubmissionScalarRelationFilter, ForensicSubmissionWhereInput>
  }

  export type ForensicSubmissionStatusHistoryOrderByWithRelationInput = {
    historyId?: SortOrder
    submissionId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    remark?: SortOrderInput | SortOrder
    changedBy?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    submission?: ForensicSubmissionOrderByWithRelationInput
  }

  export type ForensicSubmissionStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    historyId?: string
    AND?: ForensicSubmissionStatusHistoryWhereInput | ForensicSubmissionStatusHistoryWhereInput[]
    OR?: ForensicSubmissionStatusHistoryWhereInput[]
    NOT?: ForensicSubmissionStatusHistoryWhereInput | ForensicSubmissionStatusHistoryWhereInput[]
    submissionId?: StringFilter<"ForensicSubmissionStatusHistory"> | string
    oldStatus?: IntFilter<"ForensicSubmissionStatusHistory"> | number
    newStatus?: IntFilter<"ForensicSubmissionStatusHistory"> | number
    remark?: StringNullableFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedBy?: StringNullableFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ForensicSubmissionStatusHistory"> | Date | string
    submission?: XOR<ForensicSubmissionScalarRelationFilter, ForensicSubmissionWhereInput>
  }, "historyId">

  export type ForensicSubmissionStatusHistoryOrderByWithAggregationInput = {
    historyId?: SortOrder
    submissionId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    remark?: SortOrderInput | SortOrder
    changedBy?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    _count?: ForensicSubmissionStatusHistoryCountOrderByAggregateInput
    _avg?: ForensicSubmissionStatusHistoryAvgOrderByAggregateInput
    _max?: ForensicSubmissionStatusHistoryMaxOrderByAggregateInput
    _min?: ForensicSubmissionStatusHistoryMinOrderByAggregateInput
    _sum?: ForensicSubmissionStatusHistorySumOrderByAggregateInput
  }

  export type ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput | ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput | ForensicSubmissionStatusHistoryScalarWhereWithAggregatesInput[]
    historyId?: StringWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | string
    submissionId?: StringWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | string
    oldStatus?: IntWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | number
    newStatus?: IntWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | number
    remark?: StringNullableWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedBy?: StringNullableWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedAt?: DateTimeWithAggregatesFilter<"ForensicSubmissionStatusHistory"> | Date | string
  }

  export type AdminCreateInput = {
    adminId?: string
    username: string
    password: string
    name: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type AdminUncheckedCreateInput = {
    adminId?: string
    username: string
    password: string
    name: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type AdminUpdateInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminCreateManyInput = {
    adminId?: string
    username: string
    password: string
    name: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type AdminUpdateManyMutationInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateManyInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCommanderCreateInput = {
    commanderId?: string
    rank?: string | null
    fullRank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    fullPosition?: string | null
    signatureImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutCommanderInput
  }

  export type OrganizationCommanderUncheckedCreateInput = {
    commanderId?: string
    organizationId: string
    rank?: string | null
    fullRank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    fullPosition?: string | null
    signatureImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationCommanderUpdateInput = {
    commanderId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    fullRank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullPosition?: NullableStringFieldUpdateOperationsInput | string | null
    signatureImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutCommanderNestedInput
  }

  export type OrganizationCommanderUncheckedUpdateInput = {
    commanderId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    fullRank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullPosition?: NullableStringFieldUpdateOperationsInput | string | null
    signatureImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCommanderCreateManyInput = {
    commanderId?: string
    organizationId: string
    rank?: string | null
    fullRank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    fullPosition?: string | null
    signatureImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationCommanderUpdateManyMutationInput = {
    commanderId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    fullRank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullPosition?: NullableStringFieldUpdateOperationsInput | string | null
    signatureImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCommanderUncheckedUpdateManyInput = {
    commanderId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    fullRank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullPosition?: NullableStringFieldUpdateOperationsInput | string | null
    signatureImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationFinanceCreateInput = {
    financeId?: string
    rank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutFinanceInput
  }

  export type OrganizationFinanceUncheckedCreateInput = {
    financeId?: string
    organizationId: string
    rank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationFinanceUpdateInput = {
    financeId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutFinanceNestedInput
  }

  export type OrganizationFinanceUncheckedUpdateInput = {
    financeId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationFinanceCreateManyInput = {
    financeId?: string
    organizationId: string
    rank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationFinanceUpdateManyMutationInput = {
    financeId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationFinanceUncheckedUpdateManyInput = {
    financeId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCreateInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderCreateNestedOneWithoutOrganizationInput
    finance?: OrganizationFinanceCreateNestedOneWithoutOrganizationInput
    persons?: PersonCreateNestedManyWithoutOrganizationInput
    receipts?: ReceiptCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderUncheckedCreateNestedOneWithoutOrganizationInput
    finance?: OrganizationFinanceUncheckedCreateNestedOneWithoutOrganizationInput
    persons?: PersonUncheckedCreateNestedManyWithoutOrganizationInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUpdateOneWithoutOrganizationNestedInput
    finance?: OrganizationFinanceUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUpdateManyWithoutOrganizationNestedInput
    receipts?: ReceiptUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUncheckedUpdateOneWithoutOrganizationNestedInput
    finance?: OrganizationFinanceUncheckedUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUncheckedUpdateManyWithoutOrganizationNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationUpdateManyMutationInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationUncheckedUpdateManyInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PersonCreateInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutPersonsInput
    receipts?: ReceiptCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    receipts?: ReceiptUncheckedCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoUncheckedCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryUncheckedCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonUpdateInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutPersonsNestedInput
    receipts?: ReceiptUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipts?: ReceiptUncheckedUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUncheckedUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUncheckedUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type PersonCreateManyInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
  }

  export type PersonUpdateManyMutationInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PersonUncheckedUpdateManyInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PersonStatusHistoryCreateInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    changedAt?: Date | string
    person: PersonCreateNestedOneWithoutStatusHistoriesInput
  }

  export type PersonStatusHistoryUncheckedCreateInput = {
    historyId?: string
    personId: string
    oldStatus: number
    newStatus: number
    changedAt?: Date | string
  }

  export type PersonStatusHistoryUpdateInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutStatusHistoriesNestedInput
  }

  export type PersonStatusHistoryUncheckedUpdateInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonStatusHistoryCreateManyInput = {
    historyId?: string
    personId: string
    oldStatus: number
    newStatus: number
    changedAt?: Date | string
  }

  export type PersonStatusHistoryUpdateManyMutationInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonStatusHistoryUncheckedUpdateManyInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestInfoCreateInput = {
    requestInfoId?: string
    purpose?: string | null
    requestingAgency?: string | null
    createdAt?: Date | string
    person: PersonCreateNestedOneWithoutRequestInfosInput
  }

  export type RequestInfoUncheckedCreateInput = {
    requestInfoId?: string
    personId: string
    purpose?: string | null
    requestingAgency?: string | null
    createdAt?: Date | string
  }

  export type RequestInfoUpdateInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutRequestInfosNestedInput
  }

  export type RequestInfoUncheckedUpdateInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestInfoCreateManyInput = {
    requestInfoId?: string
    personId: string
    purpose?: string | null
    requestingAgency?: string | null
    createdAt?: Date | string
  }

  export type RequestInfoUpdateManyMutationInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestInfoUncheckedUpdateManyInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateInput = {
    receiptId?: string
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
    organization?: OrganizationCreateNestedOneWithoutReceiptsInput
    person?: PersonCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateInput = {
    receiptId?: string
    personId?: string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
  }

  export type ReceiptUpdateInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
    organization?: OrganizationUpdateOneWithoutReceiptsNestedInput
    person?: PersonUpdateOneWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    personId?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type ReceiptCreateManyInput = {
    receiptId?: string
    personId?: string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
  }

  export type ReceiptUpdateManyMutationInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type ReceiptUncheckedUpdateManyInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    personId?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type ForensicSubmissionCreateInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
    persons?: ForensicSubmissionPersonCreateNestedManyWithoutSubmissionInput
    statusHistories?: ForensicSubmissionStatusHistoryCreateNestedManyWithoutSubmissionInput
  }

  export type ForensicSubmissionUncheckedCreateInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
    persons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutSubmissionInput
    statusHistories?: ForensicSubmissionStatusHistoryUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type ForensicSubmissionUpdateInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    persons?: ForensicSubmissionPersonUpdateManyWithoutSubmissionNestedInput
    statusHistories?: ForensicSubmissionStatusHistoryUpdateManyWithoutSubmissionNestedInput
  }

  export type ForensicSubmissionUncheckedUpdateInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    persons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutSubmissionNestedInput
    statusHistories?: ForensicSubmissionStatusHistoryUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type ForensicSubmissionCreateManyInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
  }

  export type ForensicSubmissionUpdateManyMutationInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ForensicSubmissionUncheckedUpdateManyInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ForensicSubmissionPersonCreateInput = {
    id?: string
    submission: ForensicSubmissionCreateNestedOneWithoutPersonsInput
    person: PersonCreateNestedOneWithoutForensicSubmissionPersonsInput
  }

  export type ForensicSubmissionPersonUncheckedCreateInput = {
    id?: string
    submissionId: string
    personId: string
  }

  export type ForensicSubmissionPersonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submission?: ForensicSubmissionUpdateOneRequiredWithoutPersonsNestedInput
    person?: PersonUpdateOneRequiredWithoutForensicSubmissionPersonsNestedInput
  }

  export type ForensicSubmissionPersonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionPersonCreateManyInput = {
    id?: string
    submissionId: string
    personId: string
  }

  export type ForensicSubmissionPersonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionPersonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionStatusHistoryCreateInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    remark?: string | null
    changedBy?: string | null
    changedAt?: Date | string
    submission: ForensicSubmissionCreateNestedOneWithoutStatusHistoriesInput
  }

  export type ForensicSubmissionStatusHistoryUncheckedCreateInput = {
    historyId?: string
    submissionId: string
    oldStatus: number
    newStatus: number
    remark?: string | null
    changedBy?: string | null
    changedAt?: Date | string
  }

  export type ForensicSubmissionStatusHistoryUpdateInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: ForensicSubmissionUpdateOneRequiredWithoutStatusHistoriesNestedInput
  }

  export type ForensicSubmissionStatusHistoryUncheckedUpdateInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForensicSubmissionStatusHistoryCreateManyInput = {
    historyId?: string
    submissionId: string
    oldStatus: number
    newStatus: number
    remark?: string | null
    changedBy?: string | null
    changedAt?: Date | string
  }

  export type ForensicSubmissionStatusHistoryUpdateManyMutationInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForensicSubmissionStatusHistoryUncheckedUpdateManyInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminCountOrderByAggregateInput = {
    adminId?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    adminId?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    adminId?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type OrganizationCommanderCountOrderByAggregateInput = {
    commanderId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrder
    fullRank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    fullPosition?: SortOrder
    signatureImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationCommanderMaxOrderByAggregateInput = {
    commanderId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrder
    fullRank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    fullPosition?: SortOrder
    signatureImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationCommanderMinOrderByAggregateInput = {
    commanderId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrder
    fullRank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    fullPosition?: SortOrder
    signatureImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type OrganizationFinanceCountOrderByAggregateInput = {
    financeId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationFinanceMaxOrderByAggregateInput = {
    financeId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationFinanceMinOrderByAggregateInput = {
    financeId?: SortOrder
    organizationId?: SortOrder
    rank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationCommanderNullableScalarRelationFilter = {
    is?: OrganizationCommanderWhereInput | null
    isNot?: OrganizationCommanderWhereInput | null
  }

  export type OrganizationFinanceNullableScalarRelationFilter = {
    is?: OrganizationFinanceWhereInput | null
    isNot?: OrganizationFinanceWhereInput | null
  }

  export type PersonListRelationFilter = {
    every?: PersonWhereInput
    some?: PersonWhereInput
    none?: PersonWhereInput
  }

  export type ReceiptListRelationFilter = {
    every?: ReceiptWhereInput
    some?: ReceiptWhereInput
    none?: ReceiptWhereInput
  }

  export type PersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReceiptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    organizationId?: SortOrder
    key?: SortOrder
    organizationName?: SortOrder
    rank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    organizationId?: SortOrder
    key?: SortOrder
    organizationName?: SortOrder
    rank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    organizationId?: SortOrder
    key?: SortOrder
    organizationName?: SortOrder
    rank?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    fullNameWithRank?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type RequestInfoListRelationFilter = {
    every?: RequestInfoWhereInput
    some?: RequestInfoWhereInput
    none?: RequestInfoWhereInput
  }

  export type PersonStatusHistoryListRelationFilter = {
    every?: PersonStatusHistoryWhereInput
    some?: PersonStatusHistoryWhereInput
    none?: PersonStatusHistoryWhereInput
  }

  export type ForensicSubmissionPersonListRelationFilter = {
    every?: ForensicSubmissionPersonWhereInput
    some?: ForensicSubmissionPersonWhereInput
    none?: ForensicSubmissionPersonWhereInput
  }

  export type RequestInfoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForensicSubmissionPersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonCountOrderByAggregateInput = {
    personId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    citizenId?: SortOrder
    birthDate?: SortOrder
    birthDay?: SortOrder
    birthMonth?: SortOrder
    birthYear?: SortOrder
    nationality?: SortOrder
    ethnicity?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    bodyType?: SortOrder
    skinColor?: SortOrder
    behavior?: SortOrder
    distinguishingMarks?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    workplaceAddress?: SortOrder
    father?: SortOrder
    mother?: SortOrder
    spouse?: SortOrder
    fingerprintDate?: SortOrder
    purpose?: SortOrder
    requestingAgency?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    money?: SortOrder
    moneyText?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
    deleteAt?: SortOrder
    organizationId?: SortOrder
    organizationName?: SortOrder
    fullNameOrg?: SortOrder
    rank?: SortOrder
    position?: SortOrder
    fullNameWithRank?: SortOrder
    priority?: SortOrder
    returnDate?: SortOrder
  }

  export type PersonAvgOrderByAggregateInput = {
    weight?: SortOrder
    height?: SortOrder
    money?: SortOrder
    status?: SortOrder
    priority?: SortOrder
  }

  export type PersonMaxOrderByAggregateInput = {
    personId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    citizenId?: SortOrder
    birthDate?: SortOrder
    birthDay?: SortOrder
    birthMonth?: SortOrder
    birthYear?: SortOrder
    nationality?: SortOrder
    ethnicity?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    bodyType?: SortOrder
    skinColor?: SortOrder
    behavior?: SortOrder
    distinguishingMarks?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    workplaceAddress?: SortOrder
    father?: SortOrder
    mother?: SortOrder
    spouse?: SortOrder
    fingerprintDate?: SortOrder
    purpose?: SortOrder
    requestingAgency?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    money?: SortOrder
    moneyText?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
    deleteAt?: SortOrder
    organizationId?: SortOrder
    organizationName?: SortOrder
    fullNameOrg?: SortOrder
    rank?: SortOrder
    position?: SortOrder
    fullNameWithRank?: SortOrder
    priority?: SortOrder
    returnDate?: SortOrder
  }

  export type PersonMinOrderByAggregateInput = {
    personId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    citizenId?: SortOrder
    birthDate?: SortOrder
    birthDay?: SortOrder
    birthMonth?: SortOrder
    birthYear?: SortOrder
    nationality?: SortOrder
    ethnicity?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    bodyType?: SortOrder
    skinColor?: SortOrder
    behavior?: SortOrder
    distinguishingMarks?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    workplaceAddress?: SortOrder
    father?: SortOrder
    mother?: SortOrder
    spouse?: SortOrder
    fingerprintDate?: SortOrder
    purpose?: SortOrder
    requestingAgency?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    money?: SortOrder
    moneyText?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
    deleteAt?: SortOrder
    organizationId?: SortOrder
    organizationName?: SortOrder
    fullNameOrg?: SortOrder
    rank?: SortOrder
    position?: SortOrder
    fullNameWithRank?: SortOrder
    priority?: SortOrder
    returnDate?: SortOrder
  }

  export type PersonSumOrderByAggregateInput = {
    weight?: SortOrder
    height?: SortOrder
    money?: SortOrder
    status?: SortOrder
    priority?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PersonScalarRelationFilter = {
    is?: PersonWhereInput
    isNot?: PersonWhereInput
  }

  export type PersonStatusHistoryCountOrderByAggregateInput = {
    historyId?: SortOrder
    personId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    changedAt?: SortOrder
  }

  export type PersonStatusHistoryAvgOrderByAggregateInput = {
    oldStatus?: SortOrder
    newStatus?: SortOrder
  }

  export type PersonStatusHistoryMaxOrderByAggregateInput = {
    historyId?: SortOrder
    personId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    changedAt?: SortOrder
  }

  export type PersonStatusHistoryMinOrderByAggregateInput = {
    historyId?: SortOrder
    personId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    changedAt?: SortOrder
  }

  export type PersonStatusHistorySumOrderByAggregateInput = {
    oldStatus?: SortOrder
    newStatus?: SortOrder
  }

  export type RequestInfoCountOrderByAggregateInput = {
    requestInfoId?: SortOrder
    personId?: SortOrder
    purpose?: SortOrder
    requestingAgency?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestInfoMaxOrderByAggregateInput = {
    requestInfoId?: SortOrder
    personId?: SortOrder
    purpose?: SortOrder
    requestingAgency?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestInfoMinOrderByAggregateInput = {
    requestInfoId?: SortOrder
    personId?: SortOrder
    purpose?: SortOrder
    requestingAgency?: SortOrder
    createdAt?: SortOrder
  }

  export type PersonNullableScalarRelationFilter = {
    is?: PersonWhereInput | null
    isNot?: PersonWhereInput | null
  }

  export type ReceiptCountOrderByAggregateInput = {
    receiptId?: SortOrder
    personId?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    organizationId?: SortOrder
    organizationName?: SortOrder
    fullNameOrg?: SortOrder
    rank?: SortOrder
    position?: SortOrder
    fullNameWithRank?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    money?: SortOrder
    moneyText?: SortOrder
    createdAt?: SortOrder
    priority?: SortOrder
  }

  export type ReceiptAvgOrderByAggregateInput = {
    money?: SortOrder
    priority?: SortOrder
  }

  export type ReceiptMaxOrderByAggregateInput = {
    receiptId?: SortOrder
    personId?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    organizationId?: SortOrder
    organizationName?: SortOrder
    fullNameOrg?: SortOrder
    rank?: SortOrder
    position?: SortOrder
    fullNameWithRank?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    money?: SortOrder
    moneyText?: SortOrder
    createdAt?: SortOrder
    priority?: SortOrder
  }

  export type ReceiptMinOrderByAggregateInput = {
    receiptId?: SortOrder
    personId?: SortOrder
    prefix?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    fullName?: SortOrder
    organizationId?: SortOrder
    organizationName?: SortOrder
    fullNameOrg?: SortOrder
    rank?: SortOrder
    position?: SortOrder
    fullNameWithRank?: SortOrder
    receiptBookNo?: SortOrder
    receiptNo?: SortOrder
    receiptDate?: SortOrder
    money?: SortOrder
    moneyText?: SortOrder
    createdAt?: SortOrder
    priority?: SortOrder
  }

  export type ReceiptSumOrderByAggregateInput = {
    money?: SortOrder
    priority?: SortOrder
  }

  export type ForensicSubmissionStatusHistoryListRelationFilter = {
    every?: ForensicSubmissionStatusHistoryWhereInput
    some?: ForensicSubmissionStatusHistoryWhereInput
    none?: ForensicSubmissionStatusHistoryWhereInput
  }

  export type ForensicSubmissionStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForensicSubmissionCountOrderByAggregateInput = {
    submissionId?: SortOrder
    submissionNo?: SortOrder
    submissionDate?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
  }

  export type ForensicSubmissionAvgOrderByAggregateInput = {
    status?: SortOrder
  }

  export type ForensicSubmissionMaxOrderByAggregateInput = {
    submissionId?: SortOrder
    submissionNo?: SortOrder
    submissionDate?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
  }

  export type ForensicSubmissionMinOrderByAggregateInput = {
    submissionId?: SortOrder
    submissionNo?: SortOrder
    submissionDate?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
  }

  export type ForensicSubmissionSumOrderByAggregateInput = {
    status?: SortOrder
  }

  export type ForensicSubmissionScalarRelationFilter = {
    is?: ForensicSubmissionWhereInput
    isNot?: ForensicSubmissionWhereInput
  }

  export type ForensicSubmissionPersonSubmissionIdPersonIdCompoundUniqueInput = {
    submissionId: string
    personId: string
  }

  export type ForensicSubmissionPersonCountOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    personId?: SortOrder
  }

  export type ForensicSubmissionPersonMaxOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    personId?: SortOrder
  }

  export type ForensicSubmissionPersonMinOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    personId?: SortOrder
  }

  export type ForensicSubmissionStatusHistoryCountOrderByAggregateInput = {
    historyId?: SortOrder
    submissionId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    remark?: SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
  }

  export type ForensicSubmissionStatusHistoryAvgOrderByAggregateInput = {
    oldStatus?: SortOrder
    newStatus?: SortOrder
  }

  export type ForensicSubmissionStatusHistoryMaxOrderByAggregateInput = {
    historyId?: SortOrder
    submissionId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    remark?: SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
  }

  export type ForensicSubmissionStatusHistoryMinOrderByAggregateInput = {
    historyId?: SortOrder
    submissionId?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    remark?: SortOrder
    changedBy?: SortOrder
    changedAt?: SortOrder
  }

  export type ForensicSubmissionStatusHistorySumOrderByAggregateInput = {
    oldStatus?: SortOrder
    newStatus?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizationCreateNestedOneWithoutCommanderInput = {
    create?: XOR<OrganizationCreateWithoutCommanderInput, OrganizationUncheckedCreateWithoutCommanderInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCommanderInput
    connect?: OrganizationWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type OrganizationUpdateOneRequiredWithoutCommanderNestedInput = {
    create?: XOR<OrganizationCreateWithoutCommanderInput, OrganizationUncheckedCreateWithoutCommanderInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCommanderInput
    upsert?: OrganizationUpsertWithoutCommanderInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutCommanderInput, OrganizationUpdateWithoutCommanderInput>, OrganizationUncheckedUpdateWithoutCommanderInput>
  }

  export type OrganizationCreateNestedOneWithoutFinanceInput = {
    create?: XOR<OrganizationCreateWithoutFinanceInput, OrganizationUncheckedCreateWithoutFinanceInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutFinanceInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutFinanceNestedInput = {
    create?: XOR<OrganizationCreateWithoutFinanceInput, OrganizationUncheckedCreateWithoutFinanceInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutFinanceInput
    upsert?: OrganizationUpsertWithoutFinanceInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutFinanceInput, OrganizationUpdateWithoutFinanceInput>, OrganizationUncheckedUpdateWithoutFinanceInput>
  }

  export type OrganizationCommanderCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<OrganizationCommanderCreateWithoutOrganizationInput, OrganizationCommanderUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationCommanderCreateOrConnectWithoutOrganizationInput
    connect?: OrganizationCommanderWhereUniqueInput
  }

  export type OrganizationFinanceCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<OrganizationFinanceCreateWithoutOrganizationInput, OrganizationFinanceUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationFinanceCreateOrConnectWithoutOrganizationInput
    connect?: OrganizationFinanceWhereUniqueInput
  }

  export type PersonCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<PersonCreateWithoutOrganizationInput, PersonUncheckedCreateWithoutOrganizationInput> | PersonCreateWithoutOrganizationInput[] | PersonUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutOrganizationInput | PersonCreateOrConnectWithoutOrganizationInput[]
    createMany?: PersonCreateManyOrganizationInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type ReceiptCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ReceiptCreateWithoutOrganizationInput, ReceiptUncheckedCreateWithoutOrganizationInput> | ReceiptCreateWithoutOrganizationInput[] | ReceiptUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrganizationInput | ReceiptCreateOrConnectWithoutOrganizationInput[]
    createMany?: ReceiptCreateManyOrganizationInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type OrganizationCommanderUncheckedCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<OrganizationCommanderCreateWithoutOrganizationInput, OrganizationCommanderUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationCommanderCreateOrConnectWithoutOrganizationInput
    connect?: OrganizationCommanderWhereUniqueInput
  }

  export type OrganizationFinanceUncheckedCreateNestedOneWithoutOrganizationInput = {
    create?: XOR<OrganizationFinanceCreateWithoutOrganizationInput, OrganizationFinanceUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationFinanceCreateOrConnectWithoutOrganizationInput
    connect?: OrganizationFinanceWhereUniqueInput
  }

  export type PersonUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<PersonCreateWithoutOrganizationInput, PersonUncheckedCreateWithoutOrganizationInput> | PersonCreateWithoutOrganizationInput[] | PersonUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutOrganizationInput | PersonCreateOrConnectWithoutOrganizationInput[]
    createMany?: PersonCreateManyOrganizationInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type ReceiptUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ReceiptCreateWithoutOrganizationInput, ReceiptUncheckedCreateWithoutOrganizationInput> | ReceiptCreateWithoutOrganizationInput[] | ReceiptUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrganizationInput | ReceiptCreateOrConnectWithoutOrganizationInput[]
    createMany?: ReceiptCreateManyOrganizationInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type OrganizationCommanderUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationCommanderCreateWithoutOrganizationInput, OrganizationCommanderUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationCommanderCreateOrConnectWithoutOrganizationInput
    upsert?: OrganizationCommanderUpsertWithoutOrganizationInput
    disconnect?: OrganizationCommanderWhereInput | boolean
    delete?: OrganizationCommanderWhereInput | boolean
    connect?: OrganizationCommanderWhereUniqueInput
    update?: XOR<XOR<OrganizationCommanderUpdateToOneWithWhereWithoutOrganizationInput, OrganizationCommanderUpdateWithoutOrganizationInput>, OrganizationCommanderUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationFinanceUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationFinanceCreateWithoutOrganizationInput, OrganizationFinanceUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationFinanceCreateOrConnectWithoutOrganizationInput
    upsert?: OrganizationFinanceUpsertWithoutOrganizationInput
    disconnect?: OrganizationFinanceWhereInput | boolean
    delete?: OrganizationFinanceWhereInput | boolean
    connect?: OrganizationFinanceWhereUniqueInput
    update?: XOR<XOR<OrganizationFinanceUpdateToOneWithWhereWithoutOrganizationInput, OrganizationFinanceUpdateWithoutOrganizationInput>, OrganizationFinanceUncheckedUpdateWithoutOrganizationInput>
  }

  export type PersonUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<PersonCreateWithoutOrganizationInput, PersonUncheckedCreateWithoutOrganizationInput> | PersonCreateWithoutOrganizationInput[] | PersonUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutOrganizationInput | PersonCreateOrConnectWithoutOrganizationInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutOrganizationInput | PersonUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: PersonCreateManyOrganizationInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutOrganizationInput | PersonUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutOrganizationInput | PersonUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type ReceiptUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ReceiptCreateWithoutOrganizationInput, ReceiptUncheckedCreateWithoutOrganizationInput> | ReceiptCreateWithoutOrganizationInput[] | ReceiptUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrganizationInput | ReceiptCreateOrConnectWithoutOrganizationInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutOrganizationInput | ReceiptUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ReceiptCreateManyOrganizationInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutOrganizationInput | ReceiptUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutOrganizationInput | ReceiptUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type OrganizationCommanderUncheckedUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationCommanderCreateWithoutOrganizationInput, OrganizationCommanderUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationCommanderCreateOrConnectWithoutOrganizationInput
    upsert?: OrganizationCommanderUpsertWithoutOrganizationInput
    disconnect?: OrganizationCommanderWhereInput | boolean
    delete?: OrganizationCommanderWhereInput | boolean
    connect?: OrganizationCommanderWhereUniqueInput
    update?: XOR<XOR<OrganizationCommanderUpdateToOneWithWhereWithoutOrganizationInput, OrganizationCommanderUpdateWithoutOrganizationInput>, OrganizationCommanderUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationFinanceUncheckedUpdateOneWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationFinanceCreateWithoutOrganizationInput, OrganizationFinanceUncheckedCreateWithoutOrganizationInput>
    connectOrCreate?: OrganizationFinanceCreateOrConnectWithoutOrganizationInput
    upsert?: OrganizationFinanceUpsertWithoutOrganizationInput
    disconnect?: OrganizationFinanceWhereInput | boolean
    delete?: OrganizationFinanceWhereInput | boolean
    connect?: OrganizationFinanceWhereUniqueInput
    update?: XOR<XOR<OrganizationFinanceUpdateToOneWithWhereWithoutOrganizationInput, OrganizationFinanceUpdateWithoutOrganizationInput>, OrganizationFinanceUncheckedUpdateWithoutOrganizationInput>
  }

  export type PersonUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<PersonCreateWithoutOrganizationInput, PersonUncheckedCreateWithoutOrganizationInput> | PersonCreateWithoutOrganizationInput[] | PersonUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutOrganizationInput | PersonCreateOrConnectWithoutOrganizationInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutOrganizationInput | PersonUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: PersonCreateManyOrganizationInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutOrganizationInput | PersonUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutOrganizationInput | PersonUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type ReceiptUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ReceiptCreateWithoutOrganizationInput, ReceiptUncheckedCreateWithoutOrganizationInput> | ReceiptCreateWithoutOrganizationInput[] | ReceiptUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrganizationInput | ReceiptCreateOrConnectWithoutOrganizationInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutOrganizationInput | ReceiptUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ReceiptCreateManyOrganizationInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutOrganizationInput | ReceiptUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutOrganizationInput | ReceiptUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutPersonsInput = {
    create?: XOR<OrganizationCreateWithoutPersonsInput, OrganizationUncheckedCreateWithoutPersonsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutPersonsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ReceiptCreateNestedManyWithoutPersonInput = {
    create?: XOR<ReceiptCreateWithoutPersonInput, ReceiptUncheckedCreateWithoutPersonInput> | ReceiptCreateWithoutPersonInput[] | ReceiptUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutPersonInput | ReceiptCreateOrConnectWithoutPersonInput[]
    createMany?: ReceiptCreateManyPersonInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type RequestInfoCreateNestedManyWithoutPersonInput = {
    create?: XOR<RequestInfoCreateWithoutPersonInput, RequestInfoUncheckedCreateWithoutPersonInput> | RequestInfoCreateWithoutPersonInput[] | RequestInfoUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: RequestInfoCreateOrConnectWithoutPersonInput | RequestInfoCreateOrConnectWithoutPersonInput[]
    createMany?: RequestInfoCreateManyPersonInputEnvelope
    connect?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
  }

  export type PersonStatusHistoryCreateNestedManyWithoutPersonInput = {
    create?: XOR<PersonStatusHistoryCreateWithoutPersonInput, PersonStatusHistoryUncheckedCreateWithoutPersonInput> | PersonStatusHistoryCreateWithoutPersonInput[] | PersonStatusHistoryUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PersonStatusHistoryCreateOrConnectWithoutPersonInput | PersonStatusHistoryCreateOrConnectWithoutPersonInput[]
    createMany?: PersonStatusHistoryCreateManyPersonInputEnvelope
    connect?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
  }

  export type ForensicSubmissionPersonCreateNestedManyWithoutPersonInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutPersonInput, ForensicSubmissionPersonUncheckedCreateWithoutPersonInput> | ForensicSubmissionPersonCreateWithoutPersonInput[] | ForensicSubmissionPersonUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutPersonInput | ForensicSubmissionPersonCreateOrConnectWithoutPersonInput[]
    createMany?: ForensicSubmissionPersonCreateManyPersonInputEnvelope
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
  }

  export type ReceiptUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<ReceiptCreateWithoutPersonInput, ReceiptUncheckedCreateWithoutPersonInput> | ReceiptCreateWithoutPersonInput[] | ReceiptUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutPersonInput | ReceiptCreateOrConnectWithoutPersonInput[]
    createMany?: ReceiptCreateManyPersonInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type RequestInfoUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<RequestInfoCreateWithoutPersonInput, RequestInfoUncheckedCreateWithoutPersonInput> | RequestInfoCreateWithoutPersonInput[] | RequestInfoUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: RequestInfoCreateOrConnectWithoutPersonInput | RequestInfoCreateOrConnectWithoutPersonInput[]
    createMany?: RequestInfoCreateManyPersonInputEnvelope
    connect?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
  }

  export type PersonStatusHistoryUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<PersonStatusHistoryCreateWithoutPersonInput, PersonStatusHistoryUncheckedCreateWithoutPersonInput> | PersonStatusHistoryCreateWithoutPersonInput[] | PersonStatusHistoryUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PersonStatusHistoryCreateOrConnectWithoutPersonInput | PersonStatusHistoryCreateOrConnectWithoutPersonInput[]
    createMany?: PersonStatusHistoryCreateManyPersonInputEnvelope
    connect?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
  }

  export type ForensicSubmissionPersonUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutPersonInput, ForensicSubmissionPersonUncheckedCreateWithoutPersonInput> | ForensicSubmissionPersonCreateWithoutPersonInput[] | ForensicSubmissionPersonUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutPersonInput | ForensicSubmissionPersonCreateOrConnectWithoutPersonInput[]
    createMany?: ForensicSubmissionPersonCreateManyPersonInputEnvelope
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrganizationUpdateOneWithoutPersonsNestedInput = {
    create?: XOR<OrganizationCreateWithoutPersonsInput, OrganizationUncheckedCreateWithoutPersonsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutPersonsInput
    upsert?: OrganizationUpsertWithoutPersonsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutPersonsInput, OrganizationUpdateWithoutPersonsInput>, OrganizationUncheckedUpdateWithoutPersonsInput>
  }

  export type ReceiptUpdateManyWithoutPersonNestedInput = {
    create?: XOR<ReceiptCreateWithoutPersonInput, ReceiptUncheckedCreateWithoutPersonInput> | ReceiptCreateWithoutPersonInput[] | ReceiptUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutPersonInput | ReceiptCreateOrConnectWithoutPersonInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutPersonInput | ReceiptUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: ReceiptCreateManyPersonInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutPersonInput | ReceiptUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutPersonInput | ReceiptUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type RequestInfoUpdateManyWithoutPersonNestedInput = {
    create?: XOR<RequestInfoCreateWithoutPersonInput, RequestInfoUncheckedCreateWithoutPersonInput> | RequestInfoCreateWithoutPersonInput[] | RequestInfoUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: RequestInfoCreateOrConnectWithoutPersonInput | RequestInfoCreateOrConnectWithoutPersonInput[]
    upsert?: RequestInfoUpsertWithWhereUniqueWithoutPersonInput | RequestInfoUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: RequestInfoCreateManyPersonInputEnvelope
    set?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    disconnect?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    delete?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    connect?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    update?: RequestInfoUpdateWithWhereUniqueWithoutPersonInput | RequestInfoUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: RequestInfoUpdateManyWithWhereWithoutPersonInput | RequestInfoUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: RequestInfoScalarWhereInput | RequestInfoScalarWhereInput[]
  }

  export type PersonStatusHistoryUpdateManyWithoutPersonNestedInput = {
    create?: XOR<PersonStatusHistoryCreateWithoutPersonInput, PersonStatusHistoryUncheckedCreateWithoutPersonInput> | PersonStatusHistoryCreateWithoutPersonInput[] | PersonStatusHistoryUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PersonStatusHistoryCreateOrConnectWithoutPersonInput | PersonStatusHistoryCreateOrConnectWithoutPersonInput[]
    upsert?: PersonStatusHistoryUpsertWithWhereUniqueWithoutPersonInput | PersonStatusHistoryUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: PersonStatusHistoryCreateManyPersonInputEnvelope
    set?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    disconnect?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    delete?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    connect?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    update?: PersonStatusHistoryUpdateWithWhereUniqueWithoutPersonInput | PersonStatusHistoryUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: PersonStatusHistoryUpdateManyWithWhereWithoutPersonInput | PersonStatusHistoryUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: PersonStatusHistoryScalarWhereInput | PersonStatusHistoryScalarWhereInput[]
  }

  export type ForensicSubmissionPersonUpdateManyWithoutPersonNestedInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutPersonInput, ForensicSubmissionPersonUncheckedCreateWithoutPersonInput> | ForensicSubmissionPersonCreateWithoutPersonInput[] | ForensicSubmissionPersonUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutPersonInput | ForensicSubmissionPersonCreateOrConnectWithoutPersonInput[]
    upsert?: ForensicSubmissionPersonUpsertWithWhereUniqueWithoutPersonInput | ForensicSubmissionPersonUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: ForensicSubmissionPersonCreateManyPersonInputEnvelope
    set?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    disconnect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    delete?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    update?: ForensicSubmissionPersonUpdateWithWhereUniqueWithoutPersonInput | ForensicSubmissionPersonUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: ForensicSubmissionPersonUpdateManyWithWhereWithoutPersonInput | ForensicSubmissionPersonUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: ForensicSubmissionPersonScalarWhereInput | ForensicSubmissionPersonScalarWhereInput[]
  }

  export type ReceiptUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<ReceiptCreateWithoutPersonInput, ReceiptUncheckedCreateWithoutPersonInput> | ReceiptCreateWithoutPersonInput[] | ReceiptUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutPersonInput | ReceiptCreateOrConnectWithoutPersonInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutPersonInput | ReceiptUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: ReceiptCreateManyPersonInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutPersonInput | ReceiptUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutPersonInput | ReceiptUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type RequestInfoUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<RequestInfoCreateWithoutPersonInput, RequestInfoUncheckedCreateWithoutPersonInput> | RequestInfoCreateWithoutPersonInput[] | RequestInfoUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: RequestInfoCreateOrConnectWithoutPersonInput | RequestInfoCreateOrConnectWithoutPersonInput[]
    upsert?: RequestInfoUpsertWithWhereUniqueWithoutPersonInput | RequestInfoUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: RequestInfoCreateManyPersonInputEnvelope
    set?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    disconnect?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    delete?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    connect?: RequestInfoWhereUniqueInput | RequestInfoWhereUniqueInput[]
    update?: RequestInfoUpdateWithWhereUniqueWithoutPersonInput | RequestInfoUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: RequestInfoUpdateManyWithWhereWithoutPersonInput | RequestInfoUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: RequestInfoScalarWhereInput | RequestInfoScalarWhereInput[]
  }

  export type PersonStatusHistoryUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<PersonStatusHistoryCreateWithoutPersonInput, PersonStatusHistoryUncheckedCreateWithoutPersonInput> | PersonStatusHistoryCreateWithoutPersonInput[] | PersonStatusHistoryUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: PersonStatusHistoryCreateOrConnectWithoutPersonInput | PersonStatusHistoryCreateOrConnectWithoutPersonInput[]
    upsert?: PersonStatusHistoryUpsertWithWhereUniqueWithoutPersonInput | PersonStatusHistoryUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: PersonStatusHistoryCreateManyPersonInputEnvelope
    set?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    disconnect?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    delete?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    connect?: PersonStatusHistoryWhereUniqueInput | PersonStatusHistoryWhereUniqueInput[]
    update?: PersonStatusHistoryUpdateWithWhereUniqueWithoutPersonInput | PersonStatusHistoryUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: PersonStatusHistoryUpdateManyWithWhereWithoutPersonInput | PersonStatusHistoryUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: PersonStatusHistoryScalarWhereInput | PersonStatusHistoryScalarWhereInput[]
  }

  export type ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutPersonInput, ForensicSubmissionPersonUncheckedCreateWithoutPersonInput> | ForensicSubmissionPersonCreateWithoutPersonInput[] | ForensicSubmissionPersonUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutPersonInput | ForensicSubmissionPersonCreateOrConnectWithoutPersonInput[]
    upsert?: ForensicSubmissionPersonUpsertWithWhereUniqueWithoutPersonInput | ForensicSubmissionPersonUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: ForensicSubmissionPersonCreateManyPersonInputEnvelope
    set?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    disconnect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    delete?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    update?: ForensicSubmissionPersonUpdateWithWhereUniqueWithoutPersonInput | ForensicSubmissionPersonUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: ForensicSubmissionPersonUpdateManyWithWhereWithoutPersonInput | ForensicSubmissionPersonUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: ForensicSubmissionPersonScalarWhereInput | ForensicSubmissionPersonScalarWhereInput[]
  }

  export type PersonCreateNestedOneWithoutStatusHistoriesInput = {
    create?: XOR<PersonCreateWithoutStatusHistoriesInput, PersonUncheckedCreateWithoutStatusHistoriesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutStatusHistoriesInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonUpdateOneRequiredWithoutStatusHistoriesNestedInput = {
    create?: XOR<PersonCreateWithoutStatusHistoriesInput, PersonUncheckedCreateWithoutStatusHistoriesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutStatusHistoriesInput
    upsert?: PersonUpsertWithoutStatusHistoriesInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutStatusHistoriesInput, PersonUpdateWithoutStatusHistoriesInput>, PersonUncheckedUpdateWithoutStatusHistoriesInput>
  }

  export type PersonCreateNestedOneWithoutRequestInfosInput = {
    create?: XOR<PersonCreateWithoutRequestInfosInput, PersonUncheckedCreateWithoutRequestInfosInput>
    connectOrCreate?: PersonCreateOrConnectWithoutRequestInfosInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonUpdateOneRequiredWithoutRequestInfosNestedInput = {
    create?: XOR<PersonCreateWithoutRequestInfosInput, PersonUncheckedCreateWithoutRequestInfosInput>
    connectOrCreate?: PersonCreateOrConnectWithoutRequestInfosInput
    upsert?: PersonUpsertWithoutRequestInfosInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutRequestInfosInput, PersonUpdateWithoutRequestInfosInput>, PersonUncheckedUpdateWithoutRequestInfosInput>
  }

  export type OrganizationCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<OrganizationCreateWithoutReceiptsInput, OrganizationUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutReceiptsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<PersonCreateWithoutReceiptsInput, PersonUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutReceiptsInput
    connect?: PersonWhereUniqueInput
  }

  export type OrganizationUpdateOneWithoutReceiptsNestedInput = {
    create?: XOR<OrganizationCreateWithoutReceiptsInput, OrganizationUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutReceiptsInput
    upsert?: OrganizationUpsertWithoutReceiptsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutReceiptsInput, OrganizationUpdateWithoutReceiptsInput>, OrganizationUncheckedUpdateWithoutReceiptsInput>
  }

  export type PersonUpdateOneWithoutReceiptsNestedInput = {
    create?: XOR<PersonCreateWithoutReceiptsInput, PersonUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutReceiptsInput
    upsert?: PersonUpsertWithoutReceiptsInput
    disconnect?: PersonWhereInput | boolean
    delete?: PersonWhereInput | boolean
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutReceiptsInput, PersonUpdateWithoutReceiptsInput>, PersonUncheckedUpdateWithoutReceiptsInput>
  }

  export type ForensicSubmissionPersonCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionPersonCreateWithoutSubmissionInput[] | ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput | ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput[]
    createMany?: ForensicSubmissionPersonCreateManySubmissionInputEnvelope
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
  }

  export type ForensicSubmissionStatusHistoryCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput[] | ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput | ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput[]
    createMany?: ForensicSubmissionStatusHistoryCreateManySubmissionInputEnvelope
    connect?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
  }

  export type ForensicSubmissionPersonUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionPersonCreateWithoutSubmissionInput[] | ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput | ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput[]
    createMany?: ForensicSubmissionPersonCreateManySubmissionInputEnvelope
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
  }

  export type ForensicSubmissionStatusHistoryUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput[] | ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput | ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput[]
    createMany?: ForensicSubmissionStatusHistoryCreateManySubmissionInputEnvelope
    connect?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
  }

  export type ForensicSubmissionPersonUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionPersonCreateWithoutSubmissionInput[] | ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput | ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput[]
    upsert?: ForensicSubmissionPersonUpsertWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionPersonUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: ForensicSubmissionPersonCreateManySubmissionInputEnvelope
    set?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    disconnect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    delete?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    update?: ForensicSubmissionPersonUpdateWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionPersonUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: ForensicSubmissionPersonUpdateManyWithWhereWithoutSubmissionInput | ForensicSubmissionPersonUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: ForensicSubmissionPersonScalarWhereInput | ForensicSubmissionPersonScalarWhereInput[]
  }

  export type ForensicSubmissionStatusHistoryUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput[] | ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput | ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput[]
    upsert?: ForensicSubmissionStatusHistoryUpsertWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionStatusHistoryUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: ForensicSubmissionStatusHistoryCreateManySubmissionInputEnvelope
    set?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    disconnect?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    delete?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    connect?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    update?: ForensicSubmissionStatusHistoryUpdateWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionStatusHistoryUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: ForensicSubmissionStatusHistoryUpdateManyWithWhereWithoutSubmissionInput | ForensicSubmissionStatusHistoryUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: ForensicSubmissionStatusHistoryScalarWhereInput | ForensicSubmissionStatusHistoryScalarWhereInput[]
  }

  export type ForensicSubmissionPersonUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<ForensicSubmissionPersonCreateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionPersonCreateWithoutSubmissionInput[] | ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput | ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput[]
    upsert?: ForensicSubmissionPersonUpsertWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionPersonUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: ForensicSubmissionPersonCreateManySubmissionInputEnvelope
    set?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    disconnect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    delete?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    connect?: ForensicSubmissionPersonWhereUniqueInput | ForensicSubmissionPersonWhereUniqueInput[]
    update?: ForensicSubmissionPersonUpdateWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionPersonUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: ForensicSubmissionPersonUpdateManyWithWhereWithoutSubmissionInput | ForensicSubmissionPersonUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: ForensicSubmissionPersonScalarWhereInput | ForensicSubmissionPersonScalarWhereInput[]
  }

  export type ForensicSubmissionStatusHistoryUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput> | ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput[] | ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput | ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput[]
    upsert?: ForensicSubmissionStatusHistoryUpsertWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionStatusHistoryUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: ForensicSubmissionStatusHistoryCreateManySubmissionInputEnvelope
    set?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    disconnect?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    delete?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    connect?: ForensicSubmissionStatusHistoryWhereUniqueInput | ForensicSubmissionStatusHistoryWhereUniqueInput[]
    update?: ForensicSubmissionStatusHistoryUpdateWithWhereUniqueWithoutSubmissionInput | ForensicSubmissionStatusHistoryUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: ForensicSubmissionStatusHistoryUpdateManyWithWhereWithoutSubmissionInput | ForensicSubmissionStatusHistoryUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: ForensicSubmissionStatusHistoryScalarWhereInput | ForensicSubmissionStatusHistoryScalarWhereInput[]
  }

  export type ForensicSubmissionCreateNestedOneWithoutPersonsInput = {
    create?: XOR<ForensicSubmissionCreateWithoutPersonsInput, ForensicSubmissionUncheckedCreateWithoutPersonsInput>
    connectOrCreate?: ForensicSubmissionCreateOrConnectWithoutPersonsInput
    connect?: ForensicSubmissionWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutForensicSubmissionPersonsInput = {
    create?: XOR<PersonCreateWithoutForensicSubmissionPersonsInput, PersonUncheckedCreateWithoutForensicSubmissionPersonsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutForensicSubmissionPersonsInput
    connect?: PersonWhereUniqueInput
  }

  export type ForensicSubmissionUpdateOneRequiredWithoutPersonsNestedInput = {
    create?: XOR<ForensicSubmissionCreateWithoutPersonsInput, ForensicSubmissionUncheckedCreateWithoutPersonsInput>
    connectOrCreate?: ForensicSubmissionCreateOrConnectWithoutPersonsInput
    upsert?: ForensicSubmissionUpsertWithoutPersonsInput
    connect?: ForensicSubmissionWhereUniqueInput
    update?: XOR<XOR<ForensicSubmissionUpdateToOneWithWhereWithoutPersonsInput, ForensicSubmissionUpdateWithoutPersonsInput>, ForensicSubmissionUncheckedUpdateWithoutPersonsInput>
  }

  export type PersonUpdateOneRequiredWithoutForensicSubmissionPersonsNestedInput = {
    create?: XOR<PersonCreateWithoutForensicSubmissionPersonsInput, PersonUncheckedCreateWithoutForensicSubmissionPersonsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutForensicSubmissionPersonsInput
    upsert?: PersonUpsertWithoutForensicSubmissionPersonsInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutForensicSubmissionPersonsInput, PersonUpdateWithoutForensicSubmissionPersonsInput>, PersonUncheckedUpdateWithoutForensicSubmissionPersonsInput>
  }

  export type ForensicSubmissionCreateNestedOneWithoutStatusHistoriesInput = {
    create?: XOR<ForensicSubmissionCreateWithoutStatusHistoriesInput, ForensicSubmissionUncheckedCreateWithoutStatusHistoriesInput>
    connectOrCreate?: ForensicSubmissionCreateOrConnectWithoutStatusHistoriesInput
    connect?: ForensicSubmissionWhereUniqueInput
  }

  export type ForensicSubmissionUpdateOneRequiredWithoutStatusHistoriesNestedInput = {
    create?: XOR<ForensicSubmissionCreateWithoutStatusHistoriesInput, ForensicSubmissionUncheckedCreateWithoutStatusHistoriesInput>
    connectOrCreate?: ForensicSubmissionCreateOrConnectWithoutStatusHistoriesInput
    upsert?: ForensicSubmissionUpsertWithoutStatusHistoriesInput
    connect?: ForensicSubmissionWhereUniqueInput
    update?: XOR<XOR<ForensicSubmissionUpdateToOneWithWhereWithoutStatusHistoriesInput, ForensicSubmissionUpdateWithoutStatusHistoriesInput>, ForensicSubmissionUncheckedUpdateWithoutStatusHistoriesInput>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type OrganizationCreateWithoutCommanderInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    finance?: OrganizationFinanceCreateNestedOneWithoutOrganizationInput
    persons?: PersonCreateNestedManyWithoutOrganizationInput
    receipts?: ReceiptCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCommanderInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    finance?: OrganizationFinanceUncheckedCreateNestedOneWithoutOrganizationInput
    persons?: PersonUncheckedCreateNestedManyWithoutOrganizationInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCommanderInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCommanderInput, OrganizationUncheckedCreateWithoutCommanderInput>
  }

  export type OrganizationUpsertWithoutCommanderInput = {
    update: XOR<OrganizationUpdateWithoutCommanderInput, OrganizationUncheckedUpdateWithoutCommanderInput>
    create: XOR<OrganizationCreateWithoutCommanderInput, OrganizationUncheckedCreateWithoutCommanderInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutCommanderInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutCommanderInput, OrganizationUncheckedUpdateWithoutCommanderInput>
  }

  export type OrganizationUpdateWithoutCommanderInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finance?: OrganizationFinanceUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUpdateManyWithoutOrganizationNestedInput
    receipts?: ReceiptUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCommanderInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finance?: OrganizationFinanceUncheckedUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUncheckedUpdateManyWithoutOrganizationNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutFinanceInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderCreateNestedOneWithoutOrganizationInput
    persons?: PersonCreateNestedManyWithoutOrganizationInput
    receipts?: ReceiptCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutFinanceInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderUncheckedCreateNestedOneWithoutOrganizationInput
    persons?: PersonUncheckedCreateNestedManyWithoutOrganizationInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutFinanceInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutFinanceInput, OrganizationUncheckedCreateWithoutFinanceInput>
  }

  export type OrganizationUpsertWithoutFinanceInput = {
    update: XOR<OrganizationUpdateWithoutFinanceInput, OrganizationUncheckedUpdateWithoutFinanceInput>
    create: XOR<OrganizationCreateWithoutFinanceInput, OrganizationUncheckedCreateWithoutFinanceInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutFinanceInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutFinanceInput, OrganizationUncheckedUpdateWithoutFinanceInput>
  }

  export type OrganizationUpdateWithoutFinanceInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUpdateManyWithoutOrganizationNestedInput
    receipts?: ReceiptUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutFinanceInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUncheckedUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUncheckedUpdateManyWithoutOrganizationNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCommanderCreateWithoutOrganizationInput = {
    commanderId?: string
    rank?: string | null
    fullRank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    fullPosition?: string | null
    signatureImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationCommanderUncheckedCreateWithoutOrganizationInput = {
    commanderId?: string
    rank?: string | null
    fullRank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    fullPosition?: string | null
    signatureImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationCommanderCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationCommanderWhereUniqueInput
    create: XOR<OrganizationCommanderCreateWithoutOrganizationInput, OrganizationCommanderUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationFinanceCreateWithoutOrganizationInput = {
    financeId?: string
    rank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationFinanceUncheckedCreateWithoutOrganizationInput = {
    financeId?: string
    rank?: string | null
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    fullNameWithRank?: string | null
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationFinanceCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationFinanceWhereUniqueInput
    create: XOR<OrganizationFinanceCreateWithoutOrganizationInput, OrganizationFinanceUncheckedCreateWithoutOrganizationInput>
  }

  export type PersonCreateWithoutOrganizationInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    receipts?: ReceiptCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateWithoutOrganizationInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    receipts?: ReceiptUncheckedCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoUncheckedCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryUncheckedCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonCreateOrConnectWithoutOrganizationInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutOrganizationInput, PersonUncheckedCreateWithoutOrganizationInput>
  }

  export type PersonCreateManyOrganizationInputEnvelope = {
    data: PersonCreateManyOrganizationInput | PersonCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ReceiptCreateWithoutOrganizationInput = {
    receiptId?: string
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
    person?: PersonCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateWithoutOrganizationInput = {
    receiptId?: string
    personId?: string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
  }

  export type ReceiptCreateOrConnectWithoutOrganizationInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutOrganizationInput, ReceiptUncheckedCreateWithoutOrganizationInput>
  }

  export type ReceiptCreateManyOrganizationInputEnvelope = {
    data: ReceiptCreateManyOrganizationInput | ReceiptCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationCommanderUpsertWithoutOrganizationInput = {
    update: XOR<OrganizationCommanderUpdateWithoutOrganizationInput, OrganizationCommanderUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationCommanderCreateWithoutOrganizationInput, OrganizationCommanderUncheckedCreateWithoutOrganizationInput>
    where?: OrganizationCommanderWhereInput
  }

  export type OrganizationCommanderUpdateToOneWithWhereWithoutOrganizationInput = {
    where?: OrganizationCommanderWhereInput
    data: XOR<OrganizationCommanderUpdateWithoutOrganizationInput, OrganizationCommanderUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationCommanderUpdateWithoutOrganizationInput = {
    commanderId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    fullRank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullPosition?: NullableStringFieldUpdateOperationsInput | string | null
    signatureImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCommanderUncheckedUpdateWithoutOrganizationInput = {
    commanderId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    fullRank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullPosition?: NullableStringFieldUpdateOperationsInput | string | null
    signatureImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationFinanceUpsertWithoutOrganizationInput = {
    update: XOR<OrganizationFinanceUpdateWithoutOrganizationInput, OrganizationFinanceUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationFinanceCreateWithoutOrganizationInput, OrganizationFinanceUncheckedCreateWithoutOrganizationInput>
    where?: OrganizationFinanceWhereInput
  }

  export type OrganizationFinanceUpdateToOneWithWhereWithoutOrganizationInput = {
    where?: OrganizationFinanceWhereInput
    data: XOR<OrganizationFinanceUpdateWithoutOrganizationInput, OrganizationFinanceUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationFinanceUpdateWithoutOrganizationInput = {
    financeId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationFinanceUncheckedUpdateWithoutOrganizationInput = {
    financeId?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PersonUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutOrganizationInput, PersonUncheckedUpdateWithoutOrganizationInput>
    create: XOR<PersonCreateWithoutOrganizationInput, PersonUncheckedCreateWithoutOrganizationInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutOrganizationInput, PersonUncheckedUpdateWithoutOrganizationInput>
  }

  export type PersonUpdateManyWithWhereWithoutOrganizationInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type PersonScalarWhereInput = {
    AND?: PersonScalarWhereInput | PersonScalarWhereInput[]
    OR?: PersonScalarWhereInput[]
    NOT?: PersonScalarWhereInput | PersonScalarWhereInput[]
    personId?: StringFilter<"Person"> | string
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    prefix?: StringFilter<"Person"> | string
    firstName?: StringFilter<"Person"> | string
    lastName?: StringFilter<"Person"> | string
    fullName?: StringFilter<"Person"> | string
    citizenId?: StringFilter<"Person"> | string
    birthDate?: StringNullableFilter<"Person"> | string | null
    birthDay?: StringNullableFilter<"Person"> | string | null
    birthMonth?: StringNullableFilter<"Person"> | string | null
    birthYear?: StringNullableFilter<"Person"> | string | null
    nationality?: StringNullableFilter<"Person"> | string | null
    ethnicity?: StringNullableFilter<"Person"> | string | null
    weight?: IntNullableFilter<"Person"> | number | null
    height?: IntNullableFilter<"Person"> | number | null
    bodyType?: StringNullableFilter<"Person"> | string | null
    skinColor?: StringNullableFilter<"Person"> | string | null
    behavior?: StringNullableFilter<"Person"> | string | null
    distinguishingMarks?: StringNullableFilter<"Person"> | string | null
    address?: StringNullableFilter<"Person"> | string | null
    occupation?: StringNullableFilter<"Person"> | string | null
    workplaceAddress?: StringNullableFilter<"Person"> | string | null
    father?: StringNullableFilter<"Person"> | string | null
    mother?: StringNullableFilter<"Person"> | string | null
    spouse?: StringNullableFilter<"Person"> | string | null
    fingerprintDate?: StringNullableFilter<"Person"> | string | null
    purpose?: StringNullableFilter<"Person"> | string | null
    requestingAgency?: StringNullableFilter<"Person"> | string | null
    receiptBookNo?: StringNullableFilter<"Person"> | string | null
    receiptNo?: StringNullableFilter<"Person"> | string | null
    receiptDate?: StringNullableFilter<"Person"> | string | null
    money?: IntFilter<"Person"> | number
    moneyText?: StringNullableFilter<"Person"> | string | null
    status?: IntFilter<"Person"> | number
    statusUpdatedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    deleteAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    organizationId?: StringNullableFilter<"Person"> | string | null
    organizationName?: StringNullableFilter<"Person"> | string | null
    fullNameOrg?: StringNullableFilter<"Person"> | string | null
    rank?: StringNullableFilter<"Person"> | string | null
    position?: StringNullableFilter<"Person"> | string | null
    fullNameWithRank?: StringNullableFilter<"Person"> | string | null
    priority?: IntFilter<"Person"> | number
    returnDate?: DateTimeNullableFilter<"Person"> | Date | string | null
  }

  export type ReceiptUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ReceiptWhereUniqueInput
    update: XOR<ReceiptUpdateWithoutOrganizationInput, ReceiptUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ReceiptCreateWithoutOrganizationInput, ReceiptUncheckedCreateWithoutOrganizationInput>
  }

  export type ReceiptUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ReceiptWhereUniqueInput
    data: XOR<ReceiptUpdateWithoutOrganizationInput, ReceiptUncheckedUpdateWithoutOrganizationInput>
  }

  export type ReceiptUpdateManyWithWhereWithoutOrganizationInput = {
    where: ReceiptScalarWhereInput
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ReceiptScalarWhereInput = {
    AND?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
    OR?: ReceiptScalarWhereInput[]
    NOT?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
    receiptId?: StringFilter<"Receipt"> | string
    personId?: StringNullableFilter<"Receipt"> | string | null
    prefix?: StringFilter<"Receipt"> | string
    firstName?: StringFilter<"Receipt"> | string
    lastName?: StringFilter<"Receipt"> | string
    fullName?: StringFilter<"Receipt"> | string
    organizationId?: StringNullableFilter<"Receipt"> | string | null
    organizationName?: StringNullableFilter<"Receipt"> | string | null
    fullNameOrg?: StringNullableFilter<"Receipt"> | string | null
    rank?: StringNullableFilter<"Receipt"> | string | null
    position?: StringNullableFilter<"Receipt"> | string | null
    fullNameWithRank?: StringNullableFilter<"Receipt"> | string | null
    receiptBookNo?: StringNullableFilter<"Receipt"> | string | null
    receiptNo?: StringNullableFilter<"Receipt"> | string | null
    receiptDate?: StringNullableFilter<"Receipt"> | string | null
    money?: IntFilter<"Receipt"> | number
    moneyText?: StringNullableFilter<"Receipt"> | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    priority?: IntFilter<"Receipt"> | number
  }

  export type OrganizationCreateWithoutPersonsInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderCreateNestedOneWithoutOrganizationInput
    finance?: OrganizationFinanceCreateNestedOneWithoutOrganizationInput
    receipts?: ReceiptCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutPersonsInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderUncheckedCreateNestedOneWithoutOrganizationInput
    finance?: OrganizationFinanceUncheckedCreateNestedOneWithoutOrganizationInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutPersonsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutPersonsInput, OrganizationUncheckedCreateWithoutPersonsInput>
  }

  export type ReceiptCreateWithoutPersonInput = {
    receiptId?: string
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
    organization?: OrganizationCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateWithoutPersonInput = {
    receiptId?: string
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
  }

  export type ReceiptCreateOrConnectWithoutPersonInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutPersonInput, ReceiptUncheckedCreateWithoutPersonInput>
  }

  export type ReceiptCreateManyPersonInputEnvelope = {
    data: ReceiptCreateManyPersonInput | ReceiptCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type RequestInfoCreateWithoutPersonInput = {
    requestInfoId?: string
    purpose?: string | null
    requestingAgency?: string | null
    createdAt?: Date | string
  }

  export type RequestInfoUncheckedCreateWithoutPersonInput = {
    requestInfoId?: string
    purpose?: string | null
    requestingAgency?: string | null
    createdAt?: Date | string
  }

  export type RequestInfoCreateOrConnectWithoutPersonInput = {
    where: RequestInfoWhereUniqueInput
    create: XOR<RequestInfoCreateWithoutPersonInput, RequestInfoUncheckedCreateWithoutPersonInput>
  }

  export type RequestInfoCreateManyPersonInputEnvelope = {
    data: RequestInfoCreateManyPersonInput | RequestInfoCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type PersonStatusHistoryCreateWithoutPersonInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    changedAt?: Date | string
  }

  export type PersonStatusHistoryUncheckedCreateWithoutPersonInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    changedAt?: Date | string
  }

  export type PersonStatusHistoryCreateOrConnectWithoutPersonInput = {
    where: PersonStatusHistoryWhereUniqueInput
    create: XOR<PersonStatusHistoryCreateWithoutPersonInput, PersonStatusHistoryUncheckedCreateWithoutPersonInput>
  }

  export type PersonStatusHistoryCreateManyPersonInputEnvelope = {
    data: PersonStatusHistoryCreateManyPersonInput | PersonStatusHistoryCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type ForensicSubmissionPersonCreateWithoutPersonInput = {
    id?: string
    submission: ForensicSubmissionCreateNestedOneWithoutPersonsInput
  }

  export type ForensicSubmissionPersonUncheckedCreateWithoutPersonInput = {
    id?: string
    submissionId: string
  }

  export type ForensicSubmissionPersonCreateOrConnectWithoutPersonInput = {
    where: ForensicSubmissionPersonWhereUniqueInput
    create: XOR<ForensicSubmissionPersonCreateWithoutPersonInput, ForensicSubmissionPersonUncheckedCreateWithoutPersonInput>
  }

  export type ForensicSubmissionPersonCreateManyPersonInputEnvelope = {
    data: ForensicSubmissionPersonCreateManyPersonInput | ForensicSubmissionPersonCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutPersonsInput = {
    update: XOR<OrganizationUpdateWithoutPersonsInput, OrganizationUncheckedUpdateWithoutPersonsInput>
    create: XOR<OrganizationCreateWithoutPersonsInput, OrganizationUncheckedCreateWithoutPersonsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutPersonsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutPersonsInput, OrganizationUncheckedUpdateWithoutPersonsInput>
  }

  export type OrganizationUpdateWithoutPersonsInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUpdateOneWithoutOrganizationNestedInput
    finance?: OrganizationFinanceUpdateOneWithoutOrganizationNestedInput
    receipts?: ReceiptUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutPersonsInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUncheckedUpdateOneWithoutOrganizationNestedInput
    finance?: OrganizationFinanceUncheckedUpdateOneWithoutOrganizationNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type ReceiptUpsertWithWhereUniqueWithoutPersonInput = {
    where: ReceiptWhereUniqueInput
    update: XOR<ReceiptUpdateWithoutPersonInput, ReceiptUncheckedUpdateWithoutPersonInput>
    create: XOR<ReceiptCreateWithoutPersonInput, ReceiptUncheckedCreateWithoutPersonInput>
  }

  export type ReceiptUpdateWithWhereUniqueWithoutPersonInput = {
    where: ReceiptWhereUniqueInput
    data: XOR<ReceiptUpdateWithoutPersonInput, ReceiptUncheckedUpdateWithoutPersonInput>
  }

  export type ReceiptUpdateManyWithWhereWithoutPersonInput = {
    where: ReceiptScalarWhereInput
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyWithoutPersonInput>
  }

  export type RequestInfoUpsertWithWhereUniqueWithoutPersonInput = {
    where: RequestInfoWhereUniqueInput
    update: XOR<RequestInfoUpdateWithoutPersonInput, RequestInfoUncheckedUpdateWithoutPersonInput>
    create: XOR<RequestInfoCreateWithoutPersonInput, RequestInfoUncheckedCreateWithoutPersonInput>
  }

  export type RequestInfoUpdateWithWhereUniqueWithoutPersonInput = {
    where: RequestInfoWhereUniqueInput
    data: XOR<RequestInfoUpdateWithoutPersonInput, RequestInfoUncheckedUpdateWithoutPersonInput>
  }

  export type RequestInfoUpdateManyWithWhereWithoutPersonInput = {
    where: RequestInfoScalarWhereInput
    data: XOR<RequestInfoUpdateManyMutationInput, RequestInfoUncheckedUpdateManyWithoutPersonInput>
  }

  export type RequestInfoScalarWhereInput = {
    AND?: RequestInfoScalarWhereInput | RequestInfoScalarWhereInput[]
    OR?: RequestInfoScalarWhereInput[]
    NOT?: RequestInfoScalarWhereInput | RequestInfoScalarWhereInput[]
    requestInfoId?: StringFilter<"RequestInfo"> | string
    personId?: StringFilter<"RequestInfo"> | string
    purpose?: StringNullableFilter<"RequestInfo"> | string | null
    requestingAgency?: StringNullableFilter<"RequestInfo"> | string | null
    createdAt?: DateTimeFilter<"RequestInfo"> | Date | string
  }

  export type PersonStatusHistoryUpsertWithWhereUniqueWithoutPersonInput = {
    where: PersonStatusHistoryWhereUniqueInput
    update: XOR<PersonStatusHistoryUpdateWithoutPersonInput, PersonStatusHistoryUncheckedUpdateWithoutPersonInput>
    create: XOR<PersonStatusHistoryCreateWithoutPersonInput, PersonStatusHistoryUncheckedCreateWithoutPersonInput>
  }

  export type PersonStatusHistoryUpdateWithWhereUniqueWithoutPersonInput = {
    where: PersonStatusHistoryWhereUniqueInput
    data: XOR<PersonStatusHistoryUpdateWithoutPersonInput, PersonStatusHistoryUncheckedUpdateWithoutPersonInput>
  }

  export type PersonStatusHistoryUpdateManyWithWhereWithoutPersonInput = {
    where: PersonStatusHistoryScalarWhereInput
    data: XOR<PersonStatusHistoryUpdateManyMutationInput, PersonStatusHistoryUncheckedUpdateManyWithoutPersonInput>
  }

  export type PersonStatusHistoryScalarWhereInput = {
    AND?: PersonStatusHistoryScalarWhereInput | PersonStatusHistoryScalarWhereInput[]
    OR?: PersonStatusHistoryScalarWhereInput[]
    NOT?: PersonStatusHistoryScalarWhereInput | PersonStatusHistoryScalarWhereInput[]
    historyId?: StringFilter<"PersonStatusHistory"> | string
    personId?: StringFilter<"PersonStatusHistory"> | string
    oldStatus?: IntFilter<"PersonStatusHistory"> | number
    newStatus?: IntFilter<"PersonStatusHistory"> | number
    changedAt?: DateTimeFilter<"PersonStatusHistory"> | Date | string
  }

  export type ForensicSubmissionPersonUpsertWithWhereUniqueWithoutPersonInput = {
    where: ForensicSubmissionPersonWhereUniqueInput
    update: XOR<ForensicSubmissionPersonUpdateWithoutPersonInput, ForensicSubmissionPersonUncheckedUpdateWithoutPersonInput>
    create: XOR<ForensicSubmissionPersonCreateWithoutPersonInput, ForensicSubmissionPersonUncheckedCreateWithoutPersonInput>
  }

  export type ForensicSubmissionPersonUpdateWithWhereUniqueWithoutPersonInput = {
    where: ForensicSubmissionPersonWhereUniqueInput
    data: XOR<ForensicSubmissionPersonUpdateWithoutPersonInput, ForensicSubmissionPersonUncheckedUpdateWithoutPersonInput>
  }

  export type ForensicSubmissionPersonUpdateManyWithWhereWithoutPersonInput = {
    where: ForensicSubmissionPersonScalarWhereInput
    data: XOR<ForensicSubmissionPersonUpdateManyMutationInput, ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonInput>
  }

  export type ForensicSubmissionPersonScalarWhereInput = {
    AND?: ForensicSubmissionPersonScalarWhereInput | ForensicSubmissionPersonScalarWhereInput[]
    OR?: ForensicSubmissionPersonScalarWhereInput[]
    NOT?: ForensicSubmissionPersonScalarWhereInput | ForensicSubmissionPersonScalarWhereInput[]
    id?: StringFilter<"ForensicSubmissionPerson"> | string
    submissionId?: StringFilter<"ForensicSubmissionPerson"> | string
    personId?: StringFilter<"ForensicSubmissionPerson"> | string
  }

  export type PersonCreateWithoutStatusHistoriesInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutPersonsInput
    receipts?: ReceiptCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateWithoutStatusHistoriesInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    receipts?: ReceiptUncheckedCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoUncheckedCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonCreateOrConnectWithoutStatusHistoriesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutStatusHistoriesInput, PersonUncheckedCreateWithoutStatusHistoriesInput>
  }

  export type PersonUpsertWithoutStatusHistoriesInput = {
    update: XOR<PersonUpdateWithoutStatusHistoriesInput, PersonUncheckedUpdateWithoutStatusHistoriesInput>
    create: XOR<PersonCreateWithoutStatusHistoriesInput, PersonUncheckedCreateWithoutStatusHistoriesInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutStatusHistoriesInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutStatusHistoriesInput, PersonUncheckedUpdateWithoutStatusHistoriesInput>
  }

  export type PersonUpdateWithoutStatusHistoriesInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutPersonsNestedInput
    receipts?: ReceiptUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutStatusHistoriesInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipts?: ReceiptUncheckedUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUncheckedUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type PersonCreateWithoutRequestInfosInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutPersonsInput
    receipts?: ReceiptCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateWithoutRequestInfosInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    receipts?: ReceiptUncheckedCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryUncheckedCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonCreateOrConnectWithoutRequestInfosInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutRequestInfosInput, PersonUncheckedCreateWithoutRequestInfosInput>
  }

  export type PersonUpsertWithoutRequestInfosInput = {
    update: XOR<PersonUpdateWithoutRequestInfosInput, PersonUncheckedUpdateWithoutRequestInfosInput>
    create: XOR<PersonCreateWithoutRequestInfosInput, PersonUncheckedCreateWithoutRequestInfosInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutRequestInfosInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutRequestInfosInput, PersonUncheckedUpdateWithoutRequestInfosInput>
  }

  export type PersonUpdateWithoutRequestInfosInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutPersonsNestedInput
    receipts?: ReceiptUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutRequestInfosInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipts?: ReceiptUncheckedUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUncheckedUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type OrganizationCreateWithoutReceiptsInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderCreateNestedOneWithoutOrganizationInput
    finance?: OrganizationFinanceCreateNestedOneWithoutOrganizationInput
    persons?: PersonCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutReceiptsInput = {
    organizationId?: string
    key?: string
    organizationName: string
    rank?: string | null
    firstName: string
    lastName: string
    fullName: string
    fullNameWithRank: string
    position: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    commander?: OrganizationCommanderUncheckedCreateNestedOneWithoutOrganizationInput
    finance?: OrganizationFinanceUncheckedCreateNestedOneWithoutOrganizationInput
    persons?: PersonUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutReceiptsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutReceiptsInput, OrganizationUncheckedCreateWithoutReceiptsInput>
  }

  export type PersonCreateWithoutReceiptsInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutPersonsInput
    requestInfos?: RequestInfoCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateWithoutReceiptsInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    requestInfos?: RequestInfoUncheckedCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryUncheckedCreateNestedManyWithoutPersonInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonCreateOrConnectWithoutReceiptsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutReceiptsInput, PersonUncheckedCreateWithoutReceiptsInput>
  }

  export type OrganizationUpsertWithoutReceiptsInput = {
    update: XOR<OrganizationUpdateWithoutReceiptsInput, OrganizationUncheckedUpdateWithoutReceiptsInput>
    create: XOR<OrganizationCreateWithoutReceiptsInput, OrganizationUncheckedCreateWithoutReceiptsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutReceiptsInput, OrganizationUncheckedUpdateWithoutReceiptsInput>
  }

  export type OrganizationUpdateWithoutReceiptsInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUpdateOneWithoutOrganizationNestedInput
    finance?: OrganizationFinanceUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutReceiptsInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameWithRank?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commander?: OrganizationCommanderUncheckedUpdateOneWithoutOrganizationNestedInput
    finance?: OrganizationFinanceUncheckedUpdateOneWithoutOrganizationNestedInput
    persons?: PersonUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type PersonUpsertWithoutReceiptsInput = {
    update: XOR<PersonUpdateWithoutReceiptsInput, PersonUncheckedUpdateWithoutReceiptsInput>
    create: XOR<PersonCreateWithoutReceiptsInput, PersonUncheckedCreateWithoutReceiptsInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutReceiptsInput, PersonUncheckedUpdateWithoutReceiptsInput>
  }

  export type PersonUpdateWithoutReceiptsInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutPersonsNestedInput
    requestInfos?: RequestInfoUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutReceiptsInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestInfos?: RequestInfoUncheckedUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUncheckedUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type ForensicSubmissionPersonCreateWithoutSubmissionInput = {
    id?: string
    person: PersonCreateNestedOneWithoutForensicSubmissionPersonsInput
  }

  export type ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput = {
    id?: string
    personId: string
  }

  export type ForensicSubmissionPersonCreateOrConnectWithoutSubmissionInput = {
    where: ForensicSubmissionPersonWhereUniqueInput
    create: XOR<ForensicSubmissionPersonCreateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput>
  }

  export type ForensicSubmissionPersonCreateManySubmissionInputEnvelope = {
    data: ForensicSubmissionPersonCreateManySubmissionInput | ForensicSubmissionPersonCreateManySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    remark?: string | null
    changedBy?: string | null
    changedAt?: Date | string
  }

  export type ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    remark?: string | null
    changedBy?: string | null
    changedAt?: Date | string
  }

  export type ForensicSubmissionStatusHistoryCreateOrConnectWithoutSubmissionInput = {
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
    create: XOR<ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput>
  }

  export type ForensicSubmissionStatusHistoryCreateManySubmissionInputEnvelope = {
    data: ForensicSubmissionStatusHistoryCreateManySubmissionInput | ForensicSubmissionStatusHistoryCreateManySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type ForensicSubmissionPersonUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: ForensicSubmissionPersonWhereUniqueInput
    update: XOR<ForensicSubmissionPersonUpdateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedUpdateWithoutSubmissionInput>
    create: XOR<ForensicSubmissionPersonCreateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedCreateWithoutSubmissionInput>
  }

  export type ForensicSubmissionPersonUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: ForensicSubmissionPersonWhereUniqueInput
    data: XOR<ForensicSubmissionPersonUpdateWithoutSubmissionInput, ForensicSubmissionPersonUncheckedUpdateWithoutSubmissionInput>
  }

  export type ForensicSubmissionPersonUpdateManyWithWhereWithoutSubmissionInput = {
    where: ForensicSubmissionPersonScalarWhereInput
    data: XOR<ForensicSubmissionPersonUpdateManyMutationInput, ForensicSubmissionPersonUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type ForensicSubmissionStatusHistoryUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
    update: XOR<ForensicSubmissionStatusHistoryUpdateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedUpdateWithoutSubmissionInput>
    create: XOR<ForensicSubmissionStatusHistoryCreateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedCreateWithoutSubmissionInput>
  }

  export type ForensicSubmissionStatusHistoryUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: ForensicSubmissionStatusHistoryWhereUniqueInput
    data: XOR<ForensicSubmissionStatusHistoryUpdateWithoutSubmissionInput, ForensicSubmissionStatusHistoryUncheckedUpdateWithoutSubmissionInput>
  }

  export type ForensicSubmissionStatusHistoryUpdateManyWithWhereWithoutSubmissionInput = {
    where: ForensicSubmissionStatusHistoryScalarWhereInput
    data: XOR<ForensicSubmissionStatusHistoryUpdateManyMutationInput, ForensicSubmissionStatusHistoryUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type ForensicSubmissionStatusHistoryScalarWhereInput = {
    AND?: ForensicSubmissionStatusHistoryScalarWhereInput | ForensicSubmissionStatusHistoryScalarWhereInput[]
    OR?: ForensicSubmissionStatusHistoryScalarWhereInput[]
    NOT?: ForensicSubmissionStatusHistoryScalarWhereInput | ForensicSubmissionStatusHistoryScalarWhereInput[]
    historyId?: StringFilter<"ForensicSubmissionStatusHistory"> | string
    submissionId?: StringFilter<"ForensicSubmissionStatusHistory"> | string
    oldStatus?: IntFilter<"ForensicSubmissionStatusHistory"> | number
    newStatus?: IntFilter<"ForensicSubmissionStatusHistory"> | number
    remark?: StringNullableFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedBy?: StringNullableFilter<"ForensicSubmissionStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ForensicSubmissionStatusHistory"> | Date | string
  }

  export type ForensicSubmissionCreateWithoutPersonsInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
    statusHistories?: ForensicSubmissionStatusHistoryCreateNestedManyWithoutSubmissionInput
  }

  export type ForensicSubmissionUncheckedCreateWithoutPersonsInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
    statusHistories?: ForensicSubmissionStatusHistoryUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type ForensicSubmissionCreateOrConnectWithoutPersonsInput = {
    where: ForensicSubmissionWhereUniqueInput
    create: XOR<ForensicSubmissionCreateWithoutPersonsInput, ForensicSubmissionUncheckedCreateWithoutPersonsInput>
  }

  export type PersonCreateWithoutForensicSubmissionPersonsInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutPersonsInput
    receipts?: ReceiptCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateWithoutForensicSubmissionPersonsInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
    receipts?: ReceiptUncheckedCreateNestedManyWithoutPersonInput
    requestInfos?: RequestInfoUncheckedCreateNestedManyWithoutPersonInput
    statusHistories?: PersonStatusHistoryUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonCreateOrConnectWithoutForensicSubmissionPersonsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutForensicSubmissionPersonsInput, PersonUncheckedCreateWithoutForensicSubmissionPersonsInput>
  }

  export type ForensicSubmissionUpsertWithoutPersonsInput = {
    update: XOR<ForensicSubmissionUpdateWithoutPersonsInput, ForensicSubmissionUncheckedUpdateWithoutPersonsInput>
    create: XOR<ForensicSubmissionCreateWithoutPersonsInput, ForensicSubmissionUncheckedCreateWithoutPersonsInput>
    where?: ForensicSubmissionWhereInput
  }

  export type ForensicSubmissionUpdateToOneWithWhereWithoutPersonsInput = {
    where?: ForensicSubmissionWhereInput
    data: XOR<ForensicSubmissionUpdateWithoutPersonsInput, ForensicSubmissionUncheckedUpdateWithoutPersonsInput>
  }

  export type ForensicSubmissionUpdateWithoutPersonsInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistories?: ForensicSubmissionStatusHistoryUpdateManyWithoutSubmissionNestedInput
  }

  export type ForensicSubmissionUncheckedUpdateWithoutPersonsInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistories?: ForensicSubmissionStatusHistoryUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type PersonUpsertWithoutForensicSubmissionPersonsInput = {
    update: XOR<PersonUpdateWithoutForensicSubmissionPersonsInput, PersonUncheckedUpdateWithoutForensicSubmissionPersonsInput>
    create: XOR<PersonCreateWithoutForensicSubmissionPersonsInput, PersonUncheckedCreateWithoutForensicSubmissionPersonsInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutForensicSubmissionPersonsInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutForensicSubmissionPersonsInput, PersonUncheckedUpdateWithoutForensicSubmissionPersonsInput>
  }

  export type PersonUpdateWithoutForensicSubmissionPersonsInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutPersonsNestedInput
    receipts?: ReceiptUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutForensicSubmissionPersonsInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipts?: ReceiptUncheckedUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUncheckedUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type ForensicSubmissionCreateWithoutStatusHistoriesInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
    persons?: ForensicSubmissionPersonCreateNestedManyWithoutSubmissionInput
  }

  export type ForensicSubmissionUncheckedCreateWithoutStatusHistoriesInput = {
    submissionId?: string
    submissionNo?: string | null
    submissionDate?: Date | string
    createdAt?: Date | string
    status?: number
    statusUpdatedAt?: Date | string | null
    persons?: ForensicSubmissionPersonUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type ForensicSubmissionCreateOrConnectWithoutStatusHistoriesInput = {
    where: ForensicSubmissionWhereUniqueInput
    create: XOR<ForensicSubmissionCreateWithoutStatusHistoriesInput, ForensicSubmissionUncheckedCreateWithoutStatusHistoriesInput>
  }

  export type ForensicSubmissionUpsertWithoutStatusHistoriesInput = {
    update: XOR<ForensicSubmissionUpdateWithoutStatusHistoriesInput, ForensicSubmissionUncheckedUpdateWithoutStatusHistoriesInput>
    create: XOR<ForensicSubmissionCreateWithoutStatusHistoriesInput, ForensicSubmissionUncheckedCreateWithoutStatusHistoriesInput>
    where?: ForensicSubmissionWhereInput
  }

  export type ForensicSubmissionUpdateToOneWithWhereWithoutStatusHistoriesInput = {
    where?: ForensicSubmissionWhereInput
    data: XOR<ForensicSubmissionUpdateWithoutStatusHistoriesInput, ForensicSubmissionUncheckedUpdateWithoutStatusHistoriesInput>
  }

  export type ForensicSubmissionUpdateWithoutStatusHistoriesInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    persons?: ForensicSubmissionPersonUpdateManyWithoutSubmissionNestedInput
  }

  export type ForensicSubmissionUncheckedUpdateWithoutStatusHistoriesInput = {
    submissionId?: StringFieldUpdateOperationsInput | string
    submissionNo?: NullableStringFieldUpdateOperationsInput | string | null
    submissionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    persons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type PersonCreateManyOrganizationInput = {
    personId?: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    citizenId: string
    birthDate?: string | null
    birthDay?: string | null
    birthMonth?: string | null
    birthYear?: string | null
    nationality?: string | null
    ethnicity?: string | null
    weight?: number | null
    height?: number | null
    bodyType?: string | null
    skinColor?: string | null
    behavior?: string | null
    distinguishingMarks?: string | null
    address?: string | null
    occupation?: string | null
    workplaceAddress?: string | null
    father?: string | null
    mother?: string | null
    spouse?: string | null
    fingerprintDate?: string | null
    purpose?: string | null
    requestingAgency?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money?: number
    moneyText?: string | null
    status?: number
    statusUpdatedAt?: Date | string | null
    deleteAt?: Date | string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    priority?: number
    returnDate?: Date | string | null
  }

  export type ReceiptCreateManyOrganizationInput = {
    receiptId?: string
    personId?: string | null
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
  }

  export type PersonUpdateWithoutOrganizationInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipts?: ReceiptUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutOrganizationInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipts?: ReceiptUncheckedUpdateManyWithoutPersonNestedInput
    requestInfos?: RequestInfoUncheckedUpdateManyWithoutPersonNestedInput
    statusHistories?: PersonStatusHistoryUncheckedUpdateManyWithoutPersonNestedInput
    forensicSubmissionPersons?: ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutOrganizationInput = {
    personId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    citizenId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    birthDay?: NullableStringFieldUpdateOperationsInput | string | null
    birthMonth?: NullableStringFieldUpdateOperationsInput | string | null
    birthYear?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    bodyType?: NullableStringFieldUpdateOperationsInput | string | null
    skinColor?: NullableStringFieldUpdateOperationsInput | string | null
    behavior?: NullableStringFieldUpdateOperationsInput | string | null
    distinguishingMarks?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    workplaceAddress?: NullableStringFieldUpdateOperationsInput | string | null
    father?: NullableStringFieldUpdateOperationsInput | string | null
    mother?: NullableStringFieldUpdateOperationsInput | string | null
    spouse?: NullableStringFieldUpdateOperationsInput | string | null
    fingerprintDate?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: IntFieldUpdateOperationsInput | number
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReceiptUpdateWithoutOrganizationInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
    person?: PersonUpdateOneWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutOrganizationInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    personId?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type ReceiptUncheckedUpdateManyWithoutOrganizationInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    personId?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type ReceiptCreateManyPersonInput = {
    receiptId?: string
    prefix: string
    firstName: string
    lastName: string
    fullName: string
    organizationId?: string | null
    organizationName?: string | null
    fullNameOrg?: string | null
    rank?: string | null
    position?: string | null
    fullNameWithRank?: string | null
    receiptBookNo?: string | null
    receiptNo?: string | null
    receiptDate?: string | null
    money: number
    moneyText?: string | null
    createdAt?: Date | string
    priority?: number
  }

  export type RequestInfoCreateManyPersonInput = {
    requestInfoId?: string
    purpose?: string | null
    requestingAgency?: string | null
    createdAt?: Date | string
  }

  export type PersonStatusHistoryCreateManyPersonInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    changedAt?: Date | string
  }

  export type ForensicSubmissionPersonCreateManyPersonInput = {
    id?: string
    submissionId: string
  }

  export type ReceiptUpdateWithoutPersonInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
    organization?: OrganizationUpdateOneWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutPersonInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type ReceiptUncheckedUpdateManyWithoutPersonInput = {
    receiptId?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameOrg?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameWithRank?: NullableStringFieldUpdateOperationsInput | string | null
    receiptBookNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    receiptDate?: NullableStringFieldUpdateOperationsInput | string | null
    money?: IntFieldUpdateOperationsInput | number
    moneyText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: IntFieldUpdateOperationsInput | number
  }

  export type RequestInfoUpdateWithoutPersonInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestInfoUncheckedUpdateWithoutPersonInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestInfoUncheckedUpdateManyWithoutPersonInput = {
    requestInfoId?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    requestingAgency?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonStatusHistoryUpdateWithoutPersonInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonStatusHistoryUncheckedUpdateWithoutPersonInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonStatusHistoryUncheckedUpdateManyWithoutPersonInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForensicSubmissionPersonUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    submission?: ForensicSubmissionUpdateOneRequiredWithoutPersonsNestedInput
  }

  export type ForensicSubmissionPersonUncheckedUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionPersonUncheckedUpdateManyWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionPersonCreateManySubmissionInput = {
    id?: string
    personId: string
  }

  export type ForensicSubmissionStatusHistoryCreateManySubmissionInput = {
    historyId?: string
    oldStatus: number
    newStatus: number
    remark?: string | null
    changedBy?: string | null
    changedAt?: Date | string
  }

  export type ForensicSubmissionPersonUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: PersonUpdateOneRequiredWithoutForensicSubmissionPersonsNestedInput
  }

  export type ForensicSubmissionPersonUncheckedUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionPersonUncheckedUpdateManyWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    personId?: StringFieldUpdateOperationsInput | string
  }

  export type ForensicSubmissionStatusHistoryUpdateWithoutSubmissionInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForensicSubmissionStatusHistoryUncheckedUpdateWithoutSubmissionInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForensicSubmissionStatusHistoryUncheckedUpdateManyWithoutSubmissionInput = {
    historyId?: StringFieldUpdateOperationsInput | string
    oldStatus?: IntFieldUpdateOperationsInput | number
    newStatus?: IntFieldUpdateOperationsInput | number
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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