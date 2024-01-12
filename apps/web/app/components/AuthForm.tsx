import { registerUser } from "app/lib/actions"

export default function AuthForm(){
    return (
        <form action={registerUser}>
            <input type="email" placeholder="Email" name="email" />
            <br />
            <input type="password" placeholder="password" name="password" />
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}