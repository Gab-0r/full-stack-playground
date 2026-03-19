interface ListGroupProps {
  items: string[];
  heading: string;
}

function ListGroup({ items, heading }: ListGroupProps) {
  if (items.length === 0) {
    return (
      <>
        <h1>{heading}</h1>
        <h2>No elements to display</h2>
      </>
    );
  }

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
