export type FormattedText = {
  type: "formatted_text",
  text: string;
  bold?: true;
  italic?: true;
  underlined?: true;
  strikethrough?: true;
  superscript?: true;
  subscript?: true;
  fontFamily?: string;
  fontSize?: "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large" | "xxx-large";
};

export type FormattedTextMarks = Omit<FormattedText, "text">

const DEFAULT_FORMATTED_TEXT: FormattedText = {
  type: "formatted_text",
  text: ""
}

export namespace FormattedText {

  export function isFormattedText(variable: unknown): variable is FormattedText {
    return (
      typeof (variable) === "object"
      && variable !== null

      && "text" in variable
      && typeof (variable.text) === "string"

      && "type" in variable
      && variable.type === "formatted_text"

      && ("bold" in variable ? variable.bold === true : true)
      && ("italic" in variable ? variable.italic === true : true)
      && ("underlined" in variable ? variable.underlined === true : true)
      && ("strikethrough" in variable ? variable.strikethrough === true : true)
      && ("superscript" in variable ? variable.superscript === true : true)
      && ("subscript" in variable ? variable.subscript === true : true)
      && ("fontFamily" in variable ? typeof (variable.fontFamily) === "string" : true)
      && ("fontSize" in variable ? typeof (variable.fontSize) === "string" : true)
    );
  }

  export function isFormattedTextMarks(variable: unknown): variable is FormattedTextMarks {
    return (
      typeof (variable) === "object"
      && variable !== null

      && "type" in variable
      && variable.type === "formatted_text"

      && ("bold" in variable ? variable.bold === true : true)
      && ("italic" in variable ? variable.italic === true : true)
      && ("underlined" in variable ? variable.underlined === true : true)
      && ("strikethrough" in variable ? variable.strikethrough === true : true)
      && ("superscript" in variable ? variable.superscript === true : true)
      && ("subscript" in variable ? variable.subscript === true : true)
      && ("fontFamily" in variable ? typeof (variable.fontFamily) === "string" : true)
      && ("fontSize" in variable ? typeof (variable.fontSize) === "string" : true)
    );
  }

  export function makeDefault(): FormattedText {
    return structuredClone(DEFAULT_FORMATTED_TEXT)
  }
}
