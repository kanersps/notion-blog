import { getStyleFromAnnotations } from "../../../utils/style";

export default function Paragraph({ objects }) {
  if (!objects) {
    return <p />;
  }

  if (objects.length == 0) {
    return <br />;
  }

  return (
    <p>
      {objects.map((object, id) => {
        const style = getStyleFromAnnotations(object.annotations);

        switch (object.type) {
          case "text": {
            if (object.href) {
              return (
                <span style={style} key={id}>
                  <a href={object.href}>{object.text.content}</a>
                </span>
              );
            }

            return (
              <span style={style} key={id}>
                {object.text.content}
              </span>
            );
          }
          default: {
            return (
              <span style={style} key={id}>
                Unknown Paragraph Type: {object.type}
              </span>
            );
          }
        }
      })}
    </p>
  );
}
