import FormControl from "./components/Form/FormControl";
import TextInput from "./components/Input/TextInput";
import FormProvider from "./context/FormContext";

function App() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col space-y-5 justify-center mt-20 px-8">
                <h1 className="text-2xl font-light text-gray-600">
                    Sign in your account here
                </h1>

                <FormProvider
                    initialValues={{
                        email: "mizard@gmail.com",
                    }}
                    onSubmit={(values) => console.log(values)}
                >
                    <FormControl name="email" label="Email" required>
                        <TextInput placeholder="Type your email here..." />
                    </FormControl>
                    <FormControl name="password" label="Password" required>
                        <TextInput
                            placeholder="Type your password here..."
                            type="password"
                        />
                    </FormControl>

                    <div className="flex space-x-2">
                        <button
                            className="px-6 py-2 block bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </FormProvider>
            </div>
        </div>
    );
}

export default App;
