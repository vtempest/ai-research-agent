import { B as BaseChain } from "./index-CuvEf08d.mjs";
import { L as LLMChain } from "./llm_chain-s3ygXptc.mjs";
import { P as PromptTemplate } from "./prompt-fqA00xSS.mjs";
const API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate the full API url to call for answering the user question.
You should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
API url:`;
const API_URL_PROMPT_TEMPLATE = /* @__PURE__ */ new PromptTemplate({
  inputVariables: ["api_docs", "question"],
  template: API_URL_RAW_PROMPT_TEMPLATE
});
const API_RESPONSE_RAW_PROMPT_TEMPLATE = `${API_URL_RAW_PROMPT_TEMPLATE} {api_url}

Here is the response from the API:

{api_response}

Summarize this response to answer the original question.

Summary:`;
const API_RESPONSE_PROMPT_TEMPLATE = /* @__PURE__ */ new PromptTemplate({
  inputVariables: ["api_docs", "question", "api_url", "api_response"],
  template: API_RESPONSE_RAW_PROMPT_TEMPLATE
});
class APIChain extends BaseChain {
  get inputKeys() {
    return [this.inputKey];
  }
  get outputKeys() {
    return [this.outputKey];
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "apiAnswerChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "apiRequestChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "apiDocs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "inputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "question"
    });
    Object.defineProperty(this, "outputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "output"
    });
    this.apiRequestChain = fields.apiRequestChain;
    this.apiAnswerChain = fields.apiAnswerChain;
    this.apiDocs = fields.apiDocs;
    this.inputKey = fields.inputKey ?? this.inputKey;
    this.outputKey = fields.outputKey ?? this.outputKey;
    this.headers = fields.headers ?? this.headers;
  }
  /** @ignore */
  async _call(values, runManager) {
    const question = values[this.inputKey];
    const api_url = await this.apiRequestChain.predict({ question, api_docs: this.apiDocs }, runManager == null ? void 0 : runManager.getChild("request"));
    const res = await fetch(api_url, { headers: this.headers });
    const api_response = await res.text();
    const answer = await this.apiAnswerChain.predict({ question, api_docs: this.apiDocs, api_url, api_response }, runManager == null ? void 0 : runManager.getChild("response"));
    return { [this.outputKey]: answer };
  }
  _chainType() {
    return "api_chain";
  }
  static async deserialize(data) {
    const { api_request_chain, api_answer_chain, api_docs } = data;
    if (!api_request_chain) {
      throw new Error("LLMChain must have api_request_chain");
    }
    if (!api_answer_chain) {
      throw new Error("LLMChain must have api_answer_chain");
    }
    if (!api_docs) {
      throw new Error("LLMChain must have api_docs");
    }
    return new APIChain({
      apiAnswerChain: await LLMChain.deserialize(api_answer_chain),
      apiRequestChain: await LLMChain.deserialize(api_request_chain),
      apiDocs: api_docs
    });
  }
  serialize() {
    return {
      _type: this._chainType(),
      api_answer_chain: this.apiAnswerChain.serialize(),
      api_request_chain: this.apiRequestChain.serialize(),
      api_docs: this.apiDocs
    };
  }
  /**
   * Static method to create a new APIChain from a BaseLanguageModel and API
   * documentation.
   * @param llm BaseLanguageModel instance.
   * @param apiDocs API documentation.
   * @param options Optional configuration options for the APIChain.
   * @returns New APIChain instance.
   */
  static fromLLMAndAPIDocs(llm, apiDocs, options = {}) {
    const { apiUrlPrompt = API_URL_PROMPT_TEMPLATE, apiResponsePrompt = API_RESPONSE_PROMPT_TEMPLATE } = options;
    const apiRequestChain = new LLMChain({ prompt: apiUrlPrompt, llm });
    const apiAnswerChain = new LLMChain({ prompt: apiResponsePrompt, llm });
    return new this({
      apiAnswerChain,
      apiRequestChain,
      apiDocs,
      ...options
    });
  }
}
export {
  APIChain
};
//# sourceMappingURL=api_chain-CeLakPdz.mjs.map
