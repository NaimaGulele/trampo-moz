export default function Container({ children, style = {} }) {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
        ...style
      }}
    >
      {children}
    </div>
  );
}
