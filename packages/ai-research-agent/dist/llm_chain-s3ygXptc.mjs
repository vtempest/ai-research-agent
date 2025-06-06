import { R as Runnable, g as BaseOutputParser, B as BaseChain, h as BaseLanguageModel } from "./index-CuvEf08d.mjs";
class BasePromptTemplate extends Runnable {
  get lc_attributes() {
    return {
      partialVariables: void 0
      // python doesn't support this yet
    };
  }
  constructor(input) {
    super(input);
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain_core", "prompts", this._getPromptType()]
    });
    Object.defineProperty(this, "inputVariables", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "outputParser", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "partialVariables", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metadata", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const { inputVariables } = input;
    if (inputVariables.includes("stop")) {
      throw new Error("Cannot have an input variable named 'stop', as it is used internally, please rename.");
    }
    Object.assign(this, input);
  }
  /**
   * Merges partial variables and user variables.
   * @param userVariables The user variables to merge with the partial variables.
   * @returns A Promise that resolves to an object containing the merged variables.
   */
  async mergePartialAndUserVariables(userVariables) {
    const partialVariables = this.partialVariables ?? {};
    const partialValues = {};
    for (const [key, value] of Object.entries(partialVariables)) {
      if (typeof value === "string") {
        partialValues[key] = value;
      } else {
        partialValues[key] = await value();
      }
    }
    const allKwargs = {
      ...partialValues,
      ...userVariables
    };
    return allKwargs;
  }
  /**
   * Invokes the prompt template with the given input and options.
   * @param input The input to invoke the prompt template with.
   * @param options Optional configuration for the callback.
   * @returns A Promise that resolves to the output of the prompt template.
   */
  async invoke(input, options) {
    const metadata = {
      ...this.metadata,
      ...options == null ? void 0 : options.metadata
    };
    const tags = [...this.tags ?? [], ...(options == null ? void 0 : options.tags) ?? []];
    return this._callWithConfig((input2) => this.formatPromptValue(input2), input, { ...options, tags, metadata, runType: "prompt" });
  }
  /**
   * Return a json-like object representing this prompt template.
   * @deprecated
   */
  serialize() {
    throw new Error("Use .toJSON() instead");
  }
  /**
   * @deprecated
   * Load a prompt template from a json-like object describing it.
   *
   * @remarks
   * Deserializing needs to be async because templates (e.g. {@link FewShotPromptTemplate}) can
   * reference remote resources that we read asynchronously with a web
   * request.
   */
  static async deserialize(data) {
    switch (data._type) {
      case "prompt": {
        const { PromptTemplate } = await import("./prompt-fqA00xSS.mjs").then((n) => n.p);
        return PromptTemplate.deserialize(data);
      }
      case void 0: {
        const { PromptTemplate } = await import("./prompt-fqA00xSS.mjs").then((n) => n.p);
        return PromptTemplate.deserialize({ ...data, _type: "prompt" });
      }
      case "few_shot": {
        const { FewShotPromptTemplate } = await import("./few_shot-CC18WTh7.mjs");
        return FewShotPromptTemplate.deserialize(data);
      }
      default:
        throw new Error(`Invalid prompt type in config: ${data._type}`);
    }
  }
}
class NoOpOutputParser extends BaseOutputParser {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "lc_namespace", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ["langchain", "output_parsers", "default"]
    });
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
  }
  static lc_name() {
    return "NoOpOutputParser";
  }
  /**
   * This method takes a string as input and returns the same string as
   * output. It does not perform any operations on the input string.
   * @param text The input string to be parsed.
   * @returns The same input string without any operations performed on it.
   */
  parse(text) {
    return Promise.resolve(text);
  }
  /**
   * This method returns an empty string. It does not provide any formatting
   * instructions.
   * @returns An empty string, indicating no formatting instructions.
   */
  getFormatInstructions() {
    return "";
  }
}
function isBaseLanguageModel(llmLike) {
  return typeof llmLike._llmType === "function";
}
function _getLanguageModel(llmLike) {
  if (isBaseLanguageModel(llmLike)) {
    return llmLike;
  } else if ("bound" in llmLike && Runnable.isRunnable(llmLike.bound)) {
    return _getLanguageModel(llmLike.bound);
  } else if ("runnable" in llmLike && "fallbacks" in llmLike && Runnable.isRunnable(llmLike.runnable)) {
    return _getLanguageModel(llmLike.runnable);
  } else if ("default" in llmLike && Runnable.isRunnable(llmLike.default)) {
    return _getLanguageModel(llmLike.default);
  } else {
    throw new Error("Unable to extract BaseLanguageModel from llmLike object.");
  }
}
class LLMChain extends BaseChain {
  static lc_name() {
    return "LLMChain";
  }
  get inputKeys() {
    return this.prompt.inputVariables;
  }
  get outputKeys() {
    return [this.outputKey];
  }
  constructor(fields) {
    super(fields);
    Object.defineProperty(this, "lc_serializable", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: true
    });
    Object.defineProperty(this, "prompt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "llm", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "llmKwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "outputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "text"
    });
    Object.defineProperty(this, "outputParser", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.prompt = fields.prompt;
    this.llm = fields.llm;
    this.llmKwargs = fields.llmKwargs;
    this.outputKey = fields.outputKey ?? this.outputKey;
    this.outputParser = fields.outputParser ?? new NoOpOutputParser();
    if (this.prompt.outputParser) {
      if (fields.outputParser) {
        throw new Error("Cannot set both outputParser and prompt.outputParser");
      }
      this.outputParser = this.prompt.outputParser;
    }
  }
  getCallKeys() {
    const callKeys = "callKeys" in this.llm ? this.llm.callKeys : [];
    return callKeys;
  }
  /** @ignore */
  _selectMemoryInputs(values) {
    const valuesForMemory = super._selectMemoryInputs(values);
    const callKeys = this.getCallKeys();
    for (const key of callKeys) {
      if (key in values) {
        delete valuesForMemory[key];
      }
    }
    return valuesForMemory;
  }
  /** @ignore */
  async _getFinalOutput(generations, promptValue, runManager) {
    let finalCompletion;
    if (this.outputParser) {
      finalCompletion = await this.outputParser.parseResultWithPrompt(generations, promptValue, runManager == null ? void 0 : runManager.getChild());
    } else {
      finalCompletion = generations[0].text;
    }
    return finalCompletion;
  }
  /**
   * Run the core logic of this chain and add to output if desired.
   *
   * Wraps _call and handles memory.
   */
  call(values, config) {
    return super.call(values, config);
  }
  /** @ignore */
  async _call(values, runManager) {
    const valuesForPrompt = { ...values };
    const valuesForLLM = {
      ...this.llmKwargs
    };
    const callKeys = this.getCallKeys();
    for (const key of callKeys) {
      if (key in values) {
        if (valuesForLLM) {
          valuesForLLM[key] = values[key];
          delete valuesForPrompt[key];
        }
      }
    }
    const promptValue = await this.prompt.formatPromptValue(valuesForPrompt);
    if ("generatePrompt" in this.llm) {
      const { generations } = await this.llm.generatePrompt([promptValue], valuesForLLM, runManager == null ? void 0 : runManager.getChild());
      return {
        [this.outputKey]: await this._getFinalOutput(generations[0], promptValue, runManager)
      };
    }
    const modelWithParser = this.outputParser ? this.llm.pipe(this.outputParser) : this.llm;
    const response = await modelWithParser.invoke(promptValue, runManager == null ? void 0 : runManager.getChild());
    return {
      [this.outputKey]: response
    };
  }
  /**
   * Format prompt with values and pass to LLM
   *
   * @param values - keys to pass to prompt template
   * @param callbackManager - CallbackManager to use
   * @returns Completion from LLM.
   *
   * @example
   * ```ts
   * llm.predict({ adjective: "funny" })
   * ```
   */
  async predict(values, callbackManager) {
    const output = await this.call(values, callbackManager);
    return output[this.outputKey];
  }
  _chainType() {
    return "llm";
  }
  static async deserialize(data) {
    const { llm, prompt } = data;
    if (!llm) {
      throw new Error("LLMChain must have llm");
    }
    if (!prompt) {
      throw new Error("LLMChain must have prompt");
    }
    return new LLMChain({
      llm: await BaseLanguageModel.deserialize(llm),
      prompt: await BasePromptTemplate.deserialize(prompt)
    });
  }
  /** @deprecated */
  serialize() {
    const serialize = "serialize" in this.llm ? this.llm.serialize() : void 0;
    return {
      _type: `${this._chainType()}_chain`,
      llm: serialize,
      prompt: this.prompt.serialize()
    };
  }
  _getNumTokens(text) {
    return _getLanguageModel(this.llm).getNumTokens(text);
  }
}
const llm_chain = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LLMChain
}, Symbol.toStringTag, { value: "Module" }));
export {
  BasePromptTemplate as B,
  LLMChain as L,
  llm_chain as l
};
//# sourceMappingURL=llm_chain-s3ygXptc.mjs.map
