import { c as customJoi, e as ethereumAddressRegex, T as TOKEN_TYPE, P as PERMISSION, l as lodashExports, g as getStorage, o as openWindow, s as setStorage, C as CommonRPCError, R as RPC_ERROR, a as RPC_ERROR_MESSAGE, b as extensionStorage, r as responseToWeb, d as extensionSessionStorage, E as EthereumRPCError, f as ETHEREUM_RPC_ERROR_MESSAGE, h as getKeyPair, i as getAddress, t as toHex, j as dist, k as signTypedData, m as dist$1, W as Web3, n as extensionVersion, p as requestRPC, q as ETHEREUM_NETWORKS, u as ETHEREUM_METHOD_TYPE, A as AptosRPCError, v as APTOS_RPC_ERROR_MESSAGE, S as SuiRPCError, w as SUI_RPC_ERROR_MESSAGE, x as requestRPC$1, y as ETHEREUM, z as ETHEREUM_POPUP_METHOD_TYPE, B as ETHEREUM_NO_POPUP_METHOD_TYPE, D as APTOS, F as SUI, G as SUI_METHOD_TYPE, H as SUI_POPUP_METHOD_TYPE, I as SUI_NO_POPUP_METHOD_TYPE, J as closeWindow, K as setSessionStorage, L as TESTNET, M as PATH, N as APTOS_NETWORKS, O as SUI_NETWORKS, Q as openTab } from "./regex-D93TCDRj.js";
import { M as MESSAGE_TYPE } from "./index-DCiertCK.js";
const PRIVATE_KEY_FOR_TEST = "3ec22888f25112c10a967a45dce4181b6fcff8e41d65c3ae678725f1a124223e";
const APTOS_POPUP_METHOD_TYPE = {
  APTOS__CONNECT: "aptos_connect",
  APTOS__ACCOUNT: "aptos_account",
  APTOS__SIGN_AND_SUBMIT_TRANSACTION: "aptos_signAndSubmitTransaction",
  APTOS__SIGN_TRANSACTION: "aptos_signTransaction",
  APTOS__SIGN_MESSAGE: "aptos_signMessage"
};
const APTOS_NO_POPUP_METHOD_TYPE = {
  APTOS__IS_CONNECTED: "aptos_isConnected",
  APTOS__DISCONNECT: "aptos_disconnect",
  APTOS__NETWORK: "aptos_network"
};
const APTOS_METHOD_TYPE = {
  ...APTOS_POPUP_METHOD_TYPE,
  ...APTOS_NO_POPUP_METHOD_TYPE
};
const COMMON_NO_POPUP_METHOD_TYPE = {
  COM__PROVIDERS: "com_providers"
};
const COMMON_METHOD_TYPE = {
  ...COMMON_NO_POPUP_METHOD_TYPE
};
const suiPermissionType = Object.values(PERMISSION);
const ethcAddNetworkParamsSchema = () => customJoi.array().label("params").required().items(
  customJoi.object({
    displayDenom: customJoi.string().trim().required(),
    chainId: customJoi.string().trim().required(),
    decimals: customJoi.number().required(),
    networkName: customJoi.string().trim().required(),
    rpcURL: customJoi.string().trim().required(),
    imageURL: customJoi.string().trim().optional(),
    explorerURL: customJoi.string().trim().optional(),
    coinGeckoId: customJoi.string().trim().optional()
  }).required()
);
const walletAddEthereumChainParamsSchema = () => customJoi.array().label("params").items(
  customJoi.object({
    chainId: customJoi.string().label("chainId").trim().required(),
    chainName: customJoi.string().label("chainName").trim().required(),
    rpcUrls: customJoi.array().label("rpcUrls").items(customJoi.string().required()).required(),
    blockExplorerUrls: customJoi.array().label("blockExplorerUrls").items(customJoi.string().allow("").optional()).optional(),
    iconUrls: customJoi.array().label("iconUrls").items(customJoi.string().allow("").optional()).optional(),
    nativeCurrency: customJoi.object({
      name: customJoi.string().required(),
      symbol: customJoi.string().required(),
      decimals: customJoi.number().required()
    }).label("nativeCurrency").unknown(true).required(),
    coinGeckoId: customJoi.string().optional()
  }).required(),
  customJoi.optional()
).required();
const ethcSwitchNetworkParamsSchema = (chainIds) => customJoi.array().label("params").required().items(
  customJoi.string().label("chainId").valid(...chainIds).required()
);
const walletSwitchEthereumChainParamsSchema = (chainIds) => customJoi.array().label("params").required().items(
  customJoi.object({
    chainId: customJoi.string().valid(...chainIds).required()
  })
);
const ethSignParamsSchema = () => customJoi.array().label("params").required().items(
  customJoi.string().label("address").pattern(ethereumAddressRegex).required(),
  customJoi.string().label("dataToSign").required(),
  customJoi.optional()
);
const personalSignParamsSchema = () => customJoi.array().label("params").required().items(
  customJoi.string().label("dataToSign").required(),
  customJoi.optional(),
  customJoi.string().label("address").pattern(ethereumAddressRegex).required()
);
const ethSignTransactionParamsSchema = () => customJoi.array().label("params").required().items(
  customJoi.object({
    from: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    to: customJoi.string().optional(),
    nonce: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    data: customJoi.string().optional(),
    maxFeePerGas: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    maxPriorityFeePerGas: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    value: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    gas: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    gasPrice: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    r: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    s: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional(),
    v: customJoi.alternatives().try(customJoi.string(), customJoi.number()).optional()
  }).unknown().required()
);
const ethcAddTokensParamsSchema = () => customJoi.array().label("params").required().items(
  customJoi.object({
    tokenType: customJoi.string().valid(TOKEN_TYPE.ERC20),
    address: customJoi.string().pattern(ethereumAddressRegex).required(),
    displayDenom: customJoi.string().required(),
    decimals: customJoi.number().required(),
    imageURL: customJoi.string().optional(),
    coinGeckoId: customJoi.string().optional(),
    name: customJoi.string().optional()
  }).required()
);
const WalletWatchAssetParamsSchema = () => customJoi.object({
  type: customJoi.string().valid(TOKEN_TYPE.ERC20),
  options: customJoi.object({
    address: customJoi.string().pattern(ethereumAddressRegex).required(),
    decimals: customJoi.number().required(),
    symbol: customJoi.string().required(),
    image: customJoi.string().empty("").optional(),
    coinGeckoId: customJoi.string().empty("").optional()
  })
}).required();
const ethSignTypedDataParamsSchema = () => customJoi.array().label("params").required().items(
  customJoi.string().label("address").pattern(ethereumAddressRegex).required(),
  customJoi.string().label("dataToSign").required()
);
const aptosSignMessageSchema = () => customJoi.array().label("params").required().items(
  customJoi.object({
    address: customJoi.boolean().optional(),
    application: customJoi.boolean().optional(),
    chainId: customJoi.boolean().optional(),
    message: customJoi.string().required(),
    nonce: customJoi.number().required()
  }).required()
);
const suiConnectSchema = () => customJoi.array().label("params").required().items(
  customJoi.string().valid(...suiPermissionType).required()
);
let localQueues = [];
const setQueues = lodashExports.debounce(
  async () => {
    const queues = localQueues;
    localQueues = [];
    const currentQueue = await getStorage("queues");
    const window = await openWindow();
    await setStorage("queues", [
      ...currentQueue.map((item) => ({ ...item, windowId: window?.id })),
      ...queues.map((item) => ({ ...item, windowId: window?.id }))
    ]);
  },
  500,
  { leading: true }
);
async function cstob(request) {
  if (request.line === "COMMON") {
    const commonNoPopupMethods = Object.values(
      COMMON_NO_POPUP_METHOD_TYPE
    );
    const commonMethods = Object.values(COMMON_METHOD_TYPE);
    const { message, messageId, origin } = request;
    try {
      if (!message?.method || !commonMethods.includes(message.method)) {
        throw new CommonRPCError(
          RPC_ERROR.METHOD_NOT_SUPPORTED,
          RPC_ERROR_MESSAGE[RPC_ERROR.METHOD_NOT_SUPPORTED]
        );
      }
      const { method } = message;
      const { providers } = await extensionStorage();
      if (commonNoPopupMethods.includes(method)) {
        if (method === "com_providers") {
          const response = providers;
          responseToWeb({
            response: {
              result: response
            },
            message,
            messageId,
            origin
          });
        }
      }
    } catch (e) {
      if (e instanceof CommonRPCError) {
        responseToWeb({
          response: e.rpcMessage,
          message,
          messageId,
          origin
        });
        return;
      }
      responseToWeb({
        response: {
          error: {
            code: RPC_ERROR.INTERNAL,
            message: `${RPC_ERROR_MESSAGE[RPC_ERROR.INTERNAL]}`
          }
        },
        message,
        messageId,
        origin
      });
    }
  }
  if (request.line === "ETHEREUM") {
    const chain = ETHEREUM;
    const ethereumMethods = Object.values(ETHEREUM_METHOD_TYPE);
    const ethereumPopupMethods = Object.values(
      ETHEREUM_POPUP_METHOD_TYPE
    );
    const ethereumNoPopupMethods = Object.values(
      ETHEREUM_NO_POPUP_METHOD_TYPE
    );
    const {
      additionalEthereumNetworks,
      currentEthereumNetwork,
      currentAccountAllowedOrigins,
      currentAccount
    } = await extensionStorage();
    const { currentPassword } = await extensionSessionStorage();
    const { message, messageId, origin } = request;
    try {
      if (!message?.method || !ethereumMethods.includes(message.method)) {
        throw new EthereumRPCError(
          RPC_ERROR.UNSUPPORTED_METHOD,
          ETHEREUM_RPC_ERROR_MESSAGE[RPC_ERROR.UNSUPPORTED_METHOD],
          message?.id
        );
      }
      const { method, id } = message;
      if (ethereumPopupMethods.includes(method)) {
        if (method === "eth_sign") {
          const { params } = message;
          const schema = ethSignParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            if (currentAccountAllowedOrigins.includes(origin) && currentPassword) {
              const keyPair = getKeyPair(
                currentAccount,
                chain,
                currentPassword
              );
              const address = getAddress(chain, keyPair?.publicKey);
              if (currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey || currentAccount.type !== "LEDGER") {
                if (address.toLowerCase() !== validatedParams[0].toLowerCase()) {
                  throw new EthereumRPCError(
                    RPC_ERROR.INVALID_PARAMS,
                    "Invalid address",
                    message.id
                  );
                }
              }
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "eth_signTypedData_v3" || method === "eth_signTypedData_v4") {
          const { params } = message;
          const schema = ethSignTypedDataParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            if (currentAccountAllowedOrigins.includes(origin) && currentPassword) {
              const keyPair = getKeyPair(
                currentAccount,
                chain,
                currentPassword
              );
              const address = getAddress(chain, keyPair?.publicKey);
              if (currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey || currentAccount.type !== "LEDGER") {
                if (address.toLowerCase() !== validatedParams[0].toLowerCase()) {
                  throw new EthereumRPCError(
                    RPC_ERROR.INVALID_PARAMS,
                    "Invalid address",
                    message.id
                  );
                }
              }
            }
            try {
              const param2 = JSON.parse(
                validatedParams[1]
              );
              const currentNetwork = currentEthereumNetwork;
              const chainId = param2?.domain?.chainId;
              if (chainId && toHex(chainId, { addPrefix: true, isStringNumber: true }) !== currentNetwork.chainId) {
                throw new EthereumRPCError(
                  RPC_ERROR.INVALID_PARAMS,
                  "Invalid chainId",
                  message.id
                );
              }
              const version = method === "eth_signTypedData_v3" ? dist.SignTypedDataVersion.V3 : dist.SignTypedDataVersion.V4;
              signTypedData(
                dist$1.Buffer.from(PRIVATE_KEY_FOR_TEST, "hex"),
                param2,
                version
              );
            } catch (err) {
              if (err instanceof EthereumRPCError) {
                throw err;
              }
              throw new EthereumRPCError(
                RPC_ERROR.INVALID_PARAMS,
                "Invalid data",
                message.id
              );
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "personal_sign") {
          const { params } = message;
          const schema = personalSignParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            if (currentAccountAllowedOrigins.includes(origin) && currentPassword) {
              const keyPair = getKeyPair(
                currentAccount,
                chain,
                currentPassword
              );
              const address = getAddress(chain, keyPair?.publicKey);
              if (currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey || currentAccount.type !== "LEDGER") {
                if (address.toLowerCase() !== validatedParams[1].toLowerCase()) {
                  throw new EthereumRPCError(
                    RPC_ERROR.INVALID_PARAMS,
                    "Invalid address",
                    message.id
                  );
                }
              }
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "eth_signTransaction" || method === "eth_sendTransaction") {
          const { params } = message;
          const schema = ethSignTransactionParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            if (currentAccountAllowedOrigins.includes(origin) && currentPassword) {
              const keyPair = getKeyPair(
                currentAccount,
                chain,
                currentPassword
              );
              const address = getAddress(chain, keyPair?.publicKey);
              if (currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey || currentAccount.type !== "LEDGER") {
                if (address.toLowerCase() !== toHex(validatedParams[0].from, {
                  addPrefix: true
                }).toLowerCase()) {
                  throw new EthereumRPCError(
                    RPC_ERROR.INVALID_PARAMS,
                    "Invalid address",
                    message.id
                  );
                }
              }
            }
            const originEthereumTx = validatedParams[0];
            const nonce = originEthereumTx.nonce !== void 0 ? parseInt(toHex(originEthereumTx.nonce), 16) : void 0;
            let gas = 0;
            try {
              const provider = new Web3.providers.HttpProvider(
                currentEthereumNetwork.rpcURL,
                {
                  headers: [
                    {
                      name: "Razor",
                      value: `extension/${extensionVersion}`
                    }
                  ]
                }
              );
              const web3 = new Web3(provider);
              gas = validatedParams[0].gas ? validatedParams[0].gas : await web3.eth.estimateGas({ ...validatedParams[0], nonce });
            } catch (e) {
              throw new EthereumRPCError(
                RPC_ERROR.INVALID_PARAMS,
                e.message,
                message.id
              );
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [
                  { ...validatedParams[0], gas }
                ]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "eth_requestAccounts" || method === "wallet_requestPermissions") {
          if (currentAccountAllowedOrigins.includes(origin) && currentPassword && (currentAccount.type !== "LEDGER" || currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey)) {
            const keyPair = getKeyPair(currentAccount, chain, currentPassword);
            const address = getAddress(chain, keyPair?.publicKey);
            const result = [address];
            responseToWeb({
              response: {
                result
              },
              message,
              messageId,
              origin
            });
          } else {
            localQueues.push({
              ...request,
              message: { ...request.message, method }
            });
            void setQueues();
          }
        }
        if (method === "ethc_addNetwork") {
          const { params } = message;
          const schema = ethcAddNetworkParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            const response = await requestRPC(
              "eth_chainId",
              [],
              message.id,
              validatedParams[0].rpcURL
            );
            if (validatedParams[0].chainId !== response.result) {
              throw new EthereumRPCError(
                RPC_ERROR.INVALID_PARAMS,
                `Chain ID returned by RPC URL ${validatedParams[0].rpcURL} does not match ${validatedParams[0].chainId}`,
                message.id,
                { chainId: response.result }
              );
            }
            if (ETHEREUM_NETWORKS.map((item) => item.chainId).includes(
              validatedParams[0].chainId
            )) {
              throw new EthereumRPCError(
                RPC_ERROR.INVALID_PARAMS,
                `Can't add ${validatedParams[0].chainId}`,
                message.id,
                { chainId: response.result }
              );
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "ethc_switchNetwork") {
          const { params } = message;
          const networkChainIds = [
            ...ETHEREUM_NETWORKS,
            ...additionalEthereumNetworks
          ].map((item) => item.chainId);
          const schema = ethcSwitchNetworkParamsSchema(networkChainIds);
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            if (params[0] === currentEthereumNetwork.chainId) {
              const result = null;
              responseToWeb({
                response: {
                  result
                },
                message,
                messageId,
                origin
              });
              return;
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "ethc_addTokens") {
          const { params } = message;
          const schema = ethcAddTokensParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "wallet_watchAsset") {
          const { params } = message;
          const schema = WalletWatchAssetParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            const imageURL = (() => {
              if (typeof validatedParams.options.image === "string")
                return validatedParams.options.image;
              if (Array.isArray(validatedParams.options.image) && validatedParams.options.image.length > 0) {
                const firstImage = validatedParams.options.image[0];
                return typeof firstImage === "string" ? firstImage : void 0;
              }
              return void 0;
            })();
            const addTokenParam = {
              tokenType: validatedParams.type,
              address: validatedParams.options.address,
              decimals: validatedParams.options.decimals,
              displayDenom: validatedParams.options.symbol,
              imageURL,
              coinGeckoId: validatedParams.options.coinGeckoId
            };
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method: "ethc_addTokens",
                params: [addTokenParam]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "wallet_addEthereumChain") {
          const { params } = message;
          const schema = walletAddEthereumChainParamsSchema();
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            const response = await requestRPC(
              "eth_chainId",
              [],
              message.id,
              validatedParams[0].rpcUrls[0]
            );
            if (validatedParams[0].chainId !== response.result) {
              throw new EthereumRPCError(
                RPC_ERROR.INVALID_PARAMS,
                `Chain ID returned by RPC URL ${validatedParams[0].rpcUrls[0]} does not match ${validatedParams[0].chainId}`,
                message.id,
                { chainId: response.result }
              );
            }
            if ([...ETHEREUM_NETWORKS, ...additionalEthereumNetworks].map((item) => item.chainId).includes(validatedParams[0].chainId)) {
              localQueues.push({
                ...request,
                message: {
                  ...request.message,
                  method: "ethc_switchNetwork",
                  params: [validatedParams[0].chainId]
                }
              });
            } else {
              const param = validatedParams[0];
              const addNetworkParam = {
                chainId: param.chainId,
                decimals: param.nativeCurrency.decimals,
                displayDenom: param.nativeCurrency.symbol,
                networkName: param.chainName,
                rpcURL: param.rpcUrls[0],
                explorerURL: param.blockExplorerUrls?.[0],
                imageURL: param.iconUrls?.[0],
                coinGeckoId: param.coinGeckoId
              };
              localQueues.push({
                ...request,
                message: {
                  ...request.message,
                  method: "ethc_addNetwork",
                  params: [addNetworkParam]
                }
              });
            }
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${err}`,
              message.id
            );
          }
        }
        if (method === "wallet_switchEthereumChain") {
          const { params } = message;
          const networkChainIds = [
            ...ETHEREUM_NETWORKS,
            ...additionalEthereumNetworks
          ].map((item) => item.chainId);
          const schema = walletSwitchEthereumChainParamsSchema(networkChainIds);
          try {
            const validatedParams = await schema.validateAsync(
              params
            );
            if (validatedParams[0].chainId === currentEthereumNetwork.chainId) {
              const result = null;
              responseToWeb({
                response: {
                  result
                },
                message,
                messageId,
                origin
              });
              return;
            }
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method: "ethc_switchNetwork",
                params: [
                  validatedParams[0].chainId
                ]
              }
            });
            void setQueues();
          } catch (err) {
            if (err instanceof EthereumRPCError) {
              throw err;
            }
            throw new EthereumRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `Unrecognized chain ID ${params?.[0]?.chainId}. Try adding the chain using wallet_addEthereumChain first.`,
              message.id
            );
          }
        }
      } else if (ethereumNoPopupMethods.includes(method)) {
        if (method === "eth_accounts") {
          if (currentAccountAllowedOrigins.includes(origin) && currentPassword && (currentAccount.type !== "LEDGER" || currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey)) {
            const keyPair = getKeyPair(currentAccount, chain, currentPassword);
            const address = getAddress(chain, keyPair?.publicKey);
            const result = address ? [address] : [];
            responseToWeb({
              response: {
                result
              },
              message,
              messageId,
              origin
            });
          } else {
            const result = [];
            responseToWeb({
              response: {
                result
              },
              message,
              messageId,
              origin
            });
          }
        } else if (method === "eth_coinbase") {
          if (currentAccountAllowedOrigins.includes(origin) && currentPassword && (currentAccount.type !== "LEDGER" || currentAccount.type === "LEDGER" && currentAccount.ethereumPublicKey)) {
            const keyPair = getKeyPair(currentAccount, chain, currentPassword);
            const address = getAddress(chain, keyPair?.publicKey);
            const result = address || null;
            responseToWeb({
              response: {
                result
              },
              message,
              messageId,
              origin
            });
          } else {
            const result = [];
            responseToWeb({
              response: {
                result
              },
              message,
              messageId,
              origin
            });
          }
        } else if (method === "wallet_getPermissions") {
          responseToWeb({
            response: {
              result: []
            },
            message,
            messageId,
            origin
          });
        } else if (method === "eth_chainId") {
          responseToWeb({
            response: {
              result: currentEthereumNetwork.chainId
            },
            message,
            messageId,
            origin
          });
        } else {
          const params = method === ETHEREUM_METHOD_TYPE.ETH__GET_BALANCE && message.params.length === 1 ? [...message.params, "latest"] : message.params;
          const response = await requestRPC(method, params, id);
          responseToWeb({ response, message, messageId, origin });
        }
      } else {
        throw new EthereumRPCError(
          RPC_ERROR.INVALID_REQUEST,
          RPC_ERROR_MESSAGE[RPC_ERROR.INVALID_REQUEST],
          message.id
        );
      }
    } catch (e) {
      if (e instanceof EthereumRPCError) {
        responseToWeb({
          response: e.rpcMessage,
          message,
          messageId,
          origin
        });
        return;
      }
      responseToWeb({
        response: {
          error: {
            code: RPC_ERROR.INTERNAL,
            message: `${RPC_ERROR_MESSAGE[RPC_ERROR.INTERNAL]}`
          },
          jsonrpc: "2.0"
        },
        message,
        messageId,
        origin
      });
    }
  }
  if (request.line === "APTOS") {
    const chain = APTOS;
    const aptosMethods = Object.values(APTOS_METHOD_TYPE);
    const aptosPopupMethods = Object.values(
      APTOS_POPUP_METHOD_TYPE
    );
    const aptosNoPopupMethods = Object.values(
      APTOS_NO_POPUP_METHOD_TYPE
    );
    const {
      currentAccountAllowedOrigins,
      currentAccount,
      allowedOrigins,
      currentAptosNetwork
    } = await extensionStorage();
    const { currentPassword } = await extensionSessionStorage();
    const { message, messageId, origin } = request;
    if (currentAccount.type === "LEDGER") {
      throw new AptosRPCError(
        RPC_ERROR.LEDGER_UNSUPPORTED_CHAIN,
        APTOS_RPC_ERROR_MESSAGE[RPC_ERROR.LEDGER_UNSUPPORTED_CHAIN]
      );
    }
    try {
      if (!message?.method || !aptosMethods.includes(message.method)) {
        throw new AptosRPCError(
          RPC_ERROR.UNSUPPORTED_METHOD,
          APTOS_RPC_ERROR_MESSAGE[RPC_ERROR.UNSUPPORTED_METHOD]
        );
      }
      const { method } = message;
      if (aptosPopupMethods.includes(method)) {
        if (method === "aptos_connect" || method === "aptos_account") {
          if (currentAccountAllowedOrigins.includes(origin) && currentPassword) {
            const keyPair = getKeyPair(
              currentAccount,
              chain,
              currentPassword
            );
            const result = {
              address: keyPair.accountAddress.toString(),
              publicKey: keyPair.publicKey.toString()
            };
            responseToWeb({
              response: {
                result
              },
              message,
              messageId,
              origin
            });
          } else {
            localQueues.push(request);
            void setQueues();
          }
        }
        if (method === "aptos_signTransaction") {
          const { params } = message;
          try {
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...params]
              }
            });
            void setQueues();
          } catch (e) {
            if (e instanceof AptosRPCError) {
              throw e;
            }
            throw new AptosRPCError(RPC_ERROR.INVALID_PARAMS, `${e}`);
          }
        }
        if (method === "aptos_signAndSubmitTransaction") {
          const { params } = message;
          try {
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...params]
              }
            });
            void setQueues();
          } catch (e) {
            if (e instanceof AptosRPCError) {
              throw e;
            }
            throw new AptosRPCError(RPC_ERROR.INVALID_PARAMS, `${e}`);
          }
        }
        if (method === "aptos_signMessage") {
          const { params } = message;
          try {
            const schema = aptosSignMessageSchema();
            const validatedParams = await schema.validateAsync(
              params
            );
            localQueues.push({
              ...request,
              message: {
                ...request.message,
                method,
                params: [...validatedParams]
              }
            });
            void setQueues();
          } catch (e) {
            if (e instanceof AptosRPCError) {
              throw e;
            }
            throw new AptosRPCError(RPC_ERROR.INVALID_PARAMS, `${e}`);
          }
        }
      } else if (aptosNoPopupMethods.includes(method)) {
        if (method === "aptos_isConnected") {
          const result = !!currentAccountAllowedOrigins.includes(origin);
          responseToWeb({
            response: {
              result
            },
            message,
            messageId,
            origin
          });
        }
        if (method === "aptos_disconnect") {
          const newAllowedOrigins = allowedOrigins.filter(
            (item) => !(item.accountId === currentAccount.id && item.origin === origin)
          );
          await setStorage("allowedOrigins", newAllowedOrigins);
          const result = null;
          responseToWeb({
            response: {
              result
            },
            message,
            messageId,
            origin
          });
        }
        if (method === "aptos_network") {
          const result = {
            name: currentAptosNetwork.networkName,
            chainId: currentAptosNetwork.chainId,
            url: currentAptosNetwork.restURL
          };
          responseToWeb({
            response: {
              result
            },
            message,
            messageId,
            origin
          });
        }
      } else {
        throw new AptosRPCError(
          RPC_ERROR.INVALID_REQUEST,
          RPC_ERROR_MESSAGE[RPC_ERROR.INVALID_REQUEST]
        );
      }
    } catch (e) {
      if (e instanceof AptosRPCError) {
        responseToWeb({
          response: e.rpcMessage,
          message,
          messageId,
          origin
        });
        return;
      }
      responseToWeb({
        response: {
          error: {
            code: RPC_ERROR.INTERNAL,
            message: `${RPC_ERROR_MESSAGE[RPC_ERROR.INTERNAL]}`
          }
        },
        message,
        messageId,
        origin
      });
    }
  }
  if (request.line === "SUI") {
    const chain = SUI;
    const suiMethods = Object.values(SUI_METHOD_TYPE);
    const suiPopupMethods = Object.values(SUI_POPUP_METHOD_TYPE);
    const suiNoPopupMethods = Object.values(
      SUI_NO_POPUP_METHOD_TYPE
    );
    const {
      currentAccountAllowedOrigins,
      currentAccount,
      suiPermissions,
      allowedOrigins,
      currentSuiNetwork
    } = await extensionStorage();
    const { currentPassword } = await extensionSessionStorage();
    const { message, messageId, origin } = request;
    const currentAccountSuiPermissions = suiPermissions?.filter(
      (permission) => permission.accountId === currentAccount.id && permission.origin === origin
    ).map((permission) => permission.permission) || [];
    try {
      if (!message?.method || !suiMethods.includes(message.method)) {
        throw new SuiRPCError(
          RPC_ERROR.UNSUPPORTED_METHOD,
          SUI_RPC_ERROR_MESSAGE[RPC_ERROR.UNSUPPORTED_METHOD],
          message?.id
        );
      }
      const { method, id } = message;
      if (suiPopupMethods.includes(method)) {
        if (method === "sui_connect") {
          const { params } = message;
          try {
            const schema = suiConnectSchema();
            const validatedParams = await schema.validateAsync(
              params
            );
            if (currentAccountAllowedOrigins.includes(origin) && validatedParams.every(
              (item) => currentAccountSuiPermissions.includes(item)
            )) {
              const result = null;
              responseToWeb({
                response: {
                  result
                },
                message,
                messageId,
                origin
              });
            } else {
              localQueues.push({
                ...request,
                message: {
                  ...request.message,
                  method,
                  params: Array.from(/* @__PURE__ */ new Set([...validatedParams]))
                }
              });
              void setQueues();
            }
          } catch (e) {
            if (e instanceof SuiRPCError) {
              throw e;
            }
            throw new SuiRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${e}`,
              id
            );
          }
        }
        if (method === "sui_getAccount") {
          try {
            if (currentAccountAllowedOrigins.includes(origin) && currentAccountSuiPermissions.includes("viewAccount")) {
              if (currentPassword) {
                const keyPair = getKeyPair(
                  currentAccount,
                  chain,
                  currentPassword
                );
                const address = getAddress(chain, keyPair?.publicKey);
                const publicKey = `0x${keyPair?.publicKey.toString("hex") || ""}`;
                const result = {
                  address,
                  publicKey
                };
                responseToWeb({
                  response: {
                    result
                  },
                  message,
                  messageId,
                  origin
                });
              } else {
                localQueues.push(request);
                void setQueues();
              }
            } else {
              throw new SuiRPCError(
                RPC_ERROR.UNAUTHORIZED,
                SUI_RPC_ERROR_MESSAGE[RPC_ERROR.UNAUTHORIZED],
                id
              );
            }
          } catch (e) {
            if (e instanceof SuiRPCError) {
              throw e;
            }
            throw new SuiRPCError(
              RPC_ERROR.INVALID_PARAMS,
              `${e}`,
              id
            );
          }
        }
        if (method === "sui_signAndExecuteTransactionBlock") {
          if (currentAccountAllowedOrigins.includes(origin) && currentAccountSuiPermissions.includes("viewAccount") && currentAccountSuiPermissions.includes("suggestTransactions")) {
            localQueues.push(request);
            void setQueues();
          } else {
            throw new SuiRPCError(
              RPC_ERROR.UNAUTHORIZED,
              SUI_RPC_ERROR_MESSAGE[RPC_ERROR.UNAUTHORIZED],
              id
            );
          }
        }
        if (method === "sui_signTransactionBlock") {
          if (currentAccountAllowedOrigins.includes(origin) && currentAccountSuiPermissions.includes("viewAccount") && currentAccountSuiPermissions.includes("suggestTransactions")) {
            localQueues.push(request);
            void setQueues();
          } else {
            throw new SuiRPCError(
              RPC_ERROR.UNAUTHORIZED,
              SUI_RPC_ERROR_MESSAGE[RPC_ERROR.UNAUTHORIZED],
              id
            );
          }
        }
        if (method === "sui_signPersonalMessage") {
          if (currentAccountAllowedOrigins.includes(origin) && currentAccountSuiPermissions.includes("viewAccount") && currentAccountSuiPermissions.includes("suggestTransactions")) {
            localQueues.push(request);
            void setQueues();
          } else {
            throw new SuiRPCError(
              RPC_ERROR.UNAUTHORIZED,
              SUI_RPC_ERROR_MESSAGE[RPC_ERROR.UNAUTHORIZED],
              id
            );
          }
        }
      } else if (suiNoPopupMethods.includes(method)) {
        if (method === "sui_getPermissions") {
          responseToWeb({
            response: {
              result: currentAccountSuiPermissions
            },
            message,
            messageId,
            origin
          });
        } else if (method === "sui_disconnect") {
          const newAllowedOrigins = allowedOrigins.filter(
            (item) => !(item.accountId === currentAccount.id && item.origin === origin)
          );
          await setStorage("allowedOrigins", newAllowedOrigins);
          const newSuiPermissions = suiPermissions.filter(
            (permission) => !(permission.accountId === currentAccount.id && permission.origin === origin)
          );
          await setStorage("suiPermissions", newSuiPermissions);
          const result = null;
          responseToWeb({
            response: {
              result
            },
            message,
            messageId,
            origin
          });
        } else if (method === "sui_getChain") {
          const result = currentSuiNetwork.networkName;
          responseToWeb({
            response: {
              result
            },
            message,
            messageId,
            origin
          });
        } else {
          const { params } = message;
          const response = await requestRPC$1(method, params, id);
          responseToWeb({ response, message, messageId, origin });
        }
      } else {
        throw new SuiRPCError(
          RPC_ERROR.INVALID_REQUEST,
          RPC_ERROR_MESSAGE[RPC_ERROR.INVALID_REQUEST],
          message.id
        );
      }
    } catch (e) {
      if (e instanceof SuiRPCError) {
        responseToWeb({
          response: e.rpcMessage,
          message,
          messageId,
          origin
        });
        return;
      }
      responseToWeb({
        response: {
          error: {
            code: RPC_ERROR.INTERNAL,
            message: `${RPC_ERROR_MESSAGE[RPC_ERROR.INTERNAL]}`
          },
          jsonrpc: "2.0"
        },
        message,
        messageId,
        origin
      });
    }
  }
}
function background() {
  chrome.runtime.onMessage.addListener(
    (request, _, sendResponse) => {
      if (request?.type === MESSAGE_TYPE.REQUEST__CONTENT_SCRIPT_TO_BACKGROUND) {
        void cstob(request);
        sendResponse();
      }
    }
  );
  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key === "queues") {
        const newQueues = newValue;
        const text = newQueues ? `${newQueues.length > 0 ? newQueues.length : ""}` : "";
        void chrome.action.setBadgeText({ text });
      }
      if (key === "theme") {
        const newTheme = newValue;
        void chrome.action.setIcon({
          path: newTheme === "LIGHT" ? "/logo-128-light.png" : "/logo-128-dark.png"
        });
      }
    }
  });
  chrome.windows.onRemoved.addListener((windowId) => {
    void (async () => {
      const queues = await getStorage("queues");
      const currentWindowIds = queues.filter((item) => typeof item.windowId === "number").map((item) => item.windowId);
      const currentWindowId = await getStorage("windowId");
      if (typeof currentWindowId === "number") {
        currentWindowIds.push(currentWindowId);
      }
      const windowIds = Array.from(new Set(currentWindowIds));
      await setStorage("windowId", null);
      if (windowIds.includes(windowId)) {
        queues.forEach((queue) => {
          responseToWeb({
            response: {
              error: {
                code: RPC_ERROR.USER_REJECTED_REQUEST,
                message: `${RPC_ERROR_MESSAGE[RPC_ERROR.USER_REJECTED_REQUEST]}`
              }
            },
            message: queue.message,
            messageId: queue.messageId,
            origin: queue.origin
          });
          void closeWindow(queue.windowId);
        });
        await setStorage("queues", []);
      }
    })();
  });
  chrome.runtime.onStartup.addListener(() => {
    void (async () => {
      await setStorage("queues", []);
      await setStorage("windowId", null);
      await setSessionStorage("password", null);
    })();
  });
  chrome.runtime.onInstalled.addListener((details) => {
    void (async () => {
      if (details.reason === "update") {
        const extensionManifest = chrome.runtime.getManifest();
        if (extensionManifest.version === extensionVersion) {
          void (async () => {
            await setStorage("allowedChainIds", [
              ...await getStorage("allowedChainIds"),
              TESTNET.id
            ]);
          })();
        }
      }
      if (details.reason === "install") {
        await setStorage("queues", []);
        await setStorage("windowId", null);
        await setStorage("accounts", []);
        await setStorage("accountName", {});
        await setStorage("additionalChains", []);
        await setStorage("additionalEthereumNetworks", []);
        await setStorage("ethereumTokens", []);
        await setStorage("ethereumNFTs", []);
        await setStorage("encryptedPassword", null);
        await setStorage("selectedAccountId", "");
        await setStorage("addressBook", []);
        await setStorage("theme", "");
        await setStorage("rootPath", PATH.DASHBOARD);
        await setStorage("homeTabIndex", {
          ethereum: 0,
          sui: 0,
          aptos: 0
        });
        await setStorage("language", "");
        await setStorage("currency", "");
        await setStorage("allowedChainIds", [ETHEREUM.id, APTOS.id, SUI.id]);
        await setStorage("allowedOrigins", []);
        await setStorage("selectedChainId", "");
        await setStorage("selectedEthereumNetworkId", ETHEREUM_NETWORKS[0].id);
        await setStorage("selectedAptosNetworkId", APTOS_NETWORKS[0].id);
        await setStorage("selectedSuiNetworkId", SUI_NETWORKS[0].id);
        await setStorage("address", {});
        await setSessionStorage("password", null);
        await openTab();
      }
    })();
  });
  void chrome.action.setBadgeBackgroundColor({ color: "#7C4FFC" });
  void chrome.action.setBadgeText({ text: "" });
}
background();
