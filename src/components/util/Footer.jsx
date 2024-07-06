function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <p
      style={{
        color: "#023020",
        padding: "0",
        margin: "0",
        border: "0",
        fontWeight: "500",
        opacity: "0.80",
      }}
    >
      Copyright &copy; {currentYear}{" "}
    </p>
  );
}

export default Footer;
