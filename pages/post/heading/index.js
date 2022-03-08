export default function Heading({ objects, type }) {
  if (!objects) {
    return <p />;
  }

  if (objects.length == 0) {
    return <p />;
  }

  switch (type) {
    case "heading_1": {
      return objects.map((object, id) => <h1 key={id}>{object.text.content}</h1>);
    }
    case "heading_2": {
      return objects.map((object, id) => <h2 key={id}>{object.text.content}</h2>);
    }
    case "heading_3": {
      return objects.map((object, id) => <h3 key={id}>{object.text.content}</h3>);
    }
    case "heading_4": {
      return objects.map((object, id) => <h4 key={id}>{object.text.content}</h4>);
    }
  }

  return <h1>Unkown Header</h1>;
}
