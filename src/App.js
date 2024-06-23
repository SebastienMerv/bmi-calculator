import React, { useState, useEffect } from 'react';

function App() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        if (height && weight) {
            const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
            setBmi(bmiValue);
        } else {
            setBmi(''); // Réinitialiser le BMI si les champs ne sont pas tous remplis
        }
    }, [height, weight]);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('PWA setup accepted');
            } else {
                console.log('PWA setup dismissed');
            }
            setDeferredPrompt(null);
        }
    };

    return (
        <div className="App">
            <header className="flex flex-col justify-center items-center pt-8 px-8 bg-gradient-to-bl from-blue-200 to-transparent rounded-4xl pb-28 relative z-10">
                <img src="/assets/logo.svg" alt="" className="w-[36px]" />
                <h1 className="text-[64px] font-inter text-center font-semibold text-gray-800">Body Mass Index Calculator</h1>
                <p className="text-center text-gray-400">
                    Better understand your weight in relation to your height using our body mass index (BMI) calculator.
                    While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to
                    evaluate your overall health and well-being.
                </p>

                <button
                    className="bg-green-500 px-4 py-2 text-gray-400 rounded-lg mt-4"
                    onClick={handleInstallClick}
                    disabled={!deferredPrompt}
                >
                    Install app
                </button>
            </header>

            <div className="mt-[-4rem] bg-white mx-8 px-4 pt-4 pb-4 rounded-lg shadow-lg relative z-50 mb-36">
                <h1 className="font-inter font-semibold text-[25px]">Enter your details below</h1>

                <div>
                    <label htmlFor="height" className="block text-[15px] font-light font-inter mt-4">Height (in cm)</label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={handleHeightChange}
                        className="w-full px-4 mt-2 rounded-lg border border-gray-400 py-4"
                    />

                    <label htmlFor="weight" className="block text-[15px] font-light font-inter mt-4">Weight (in kg)</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={handleWeightChange}
                        className="w-full px-4 mt-2 rounded-lg border border-gray-400 py-4"
                    />
                </div>

                {bmi && (
                    <div className="p-8 mt-8 rounded-lg bg-blue-500 text-white">
                        <p className="text-[20px] font-semibold">Your BMI is...</p>
                        <h1 className="text-[36px] font-semibold">{bmi}</h1>
                        <p className="mt-4 text-white">
                            Your BMI suggests you’re a healthy weight. Your ideal weight is between 63.3kgs - 85.2kgs.
                        </p>
                    </div>
                )}
            </div>

            <div className="w-full flex justify-center bg-blue-100 rounded-[32px]">
                <img src="/assets/preview.png" alt="Personne mangeant des suchis" className="-mt-[100px]" />
            </div>

            <div className="mt-12 mx-8">
                <h1 className="font-inter font-semibold text-3xl">What your BMI result means</h1>
                <p className="mt-8 text-gray-400">
                    A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower
                    your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a
                    nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables.
                    Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a
                    week.
                </p>
            </div>

            <div className="pl-8 py-8 mt-16 bg-gradient-to-bl from-blue-200 to-transparent">
                <div>
                    <img src="/assets/glace.svg" alt="" className="p-4 bg-pink-500 rounded-full h-[64px] w-[64px]" />
                    <h1 className="text-2xl font-semibold mt-8">Healthy eating</h1>
                    <p className="pt-8 font-inter text-gray-400">
                        Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental
                        clarity, and mood.
                    </p>
                </div>

                <div className="mt-8">
                    <img src="/assets/haltere.svg" alt="" className="p-4 bg-orange-500 h-[64px] w-[64px] rounded-full" />
                    <h1 className="text-2xl font-semibold mt-8">Regular exercise</h1>
                    <p className="pt-8 font-inter text-gray-400">
                        Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk,
                        fostering wellness and longevity.
                    </p>
                </div>

                <div className="mt-8">
                    <img src="/assets/moon.svg" alt="" className="p-4 bg-green-500 rounded-full h-[64px] w-[64px]" />
                    <h1 className="text-2xl font-semibold mt-8">Adequate sleep</h1>
                    <p className="pt-8 font-inter text-gray-400">
                        Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall
                        restoration and rejuvenation.
                    </p>
                </div>
            </div>

            <div className="py-10 px-6">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Limitations of BMI</h2>
                <p className="text-center text-gray-600 mb-8">
                    Although BMI is often a practical indicator of healthy weight, it is not suited for every person.
                    Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement
                    may not be beneficial to use.
                </p>
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <span className="text-red-500 mr-2">
                                <img src="/assets/gender.svg" className="w-6 h-6" alt="Gender SVG" />
                            </span>
                            <h3 className="text-lg font-semibold fon text-gray-800">Gender</h3>
                        </div>
                        <p className="text-gray-400">
                            The development and body fat composition of girls and boys vary with age. Consequently, a
                            child's age and gender are considered when evaluating their BMI.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <span className="text-blue-500 mr-2">
                                <img src="/assets/age.svg" className="w-6 h-6" alt="Age SVG" />
                            </span>
                            <h3 className="text-lg font-semibold fon text-gray-800">Age</h3>
                        </div>
                        <p className="text-gray-400">
                            In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body
                            fat content.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <span className="text-purple-500 mr-2">
                                <img src="/assets/muscle.svg" className="w-6 h-6" alt="Muscle SVG" />
                            </span>
                            <h3 className="text-lg font-semibold fon text-gray-800">Muscle</h3>
                        </div>
                        <p className="text-gray-400">
                            BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate
                            muscle from fat.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-500 mr-2">
                                <img src="/assets/pregnancy.svg" className="w-6 h-6" alt="Pregnancy SVG" />
                            </span>
                            <h3 className="text-lg font-semibold fon text-gray-800">Pregnancy</h3>
                        </div>
                        <p className="text-gray-400">
                            Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy
                            pre-pregnancy BMI is advisable to minimize health risks for both mother and child.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <span className="text-pink-500 mr-2">
                                <img src="/assets/race.svg" className="w-6 h-6" alt="Race SVG" />
                            </span>
                            <h3 className="text-lg font-semibold fon text-gray-800">Race</h3>
                        </div>
                        <p className="text-gray-400">
                            Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs
                            than others. To learn more, it is advised to discuss this with your GP or practice nurse.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
