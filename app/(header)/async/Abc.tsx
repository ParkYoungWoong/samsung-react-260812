export default async function Abc() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return <h1>Abc!</h1>
}
