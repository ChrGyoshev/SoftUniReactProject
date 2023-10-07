export default function handleClick(...clickedRef) {
  const [input, ico] = clickedRef;

  input.current.type = input.current.type === "password" ? "text" : "password";
  ico.current.classList.toggle("fa-eye");
  ico.current.classList.toggle("fa-eye-slash");
}
