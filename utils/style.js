export function getStyleFromAnnotations(annotations) {
  const style = {};

  if (annotations.bold) {
    style.fontWeight = "bold";
  }

  if (annotations.italic) {
    style.fontStyle = "italic";
  }

  if (annotations.strikethrough) {
    style.textDecoration = "line-through";
  }

  if (annotations.underline) {
    style.textDecoration = "underline";
  }

  if (annotations.color) {
    style.color = annotations.color;
  }

  return style;
}
