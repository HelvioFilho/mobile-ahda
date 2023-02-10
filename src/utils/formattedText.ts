export function formattedText(text: string) {
  let formattedText = text.replace(/class="ql-align-center"/g, `style="text-align: center"`);
  formattedText = formattedText.replace(/class="ql-align-right"/g, `style="text-align: right"`);
  formattedText = formattedText.replace(/class="ql-align-justify"/g, `style="text-align: justify"`);
  formattedText = formattedText.replace(/class="ql-size-small"/g, `style="font-size: 0.75rem"`);
  formattedText = formattedText.replace(/class="ql-size-large"/g, `style="font-size: 1.5rem"`);
  formattedText = formattedText.replace(/<p><img>/g, `<img`);
  formattedText = formattedText.replace(/"><\/p>/g, `">`);
  formattedText = formattedText.replace(/<p><br><\/p>/g, `<p style="margin: 15px 0"></p>`);
  return formattedText;
}