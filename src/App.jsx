import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [cityName, setCityName] = useState("Ha Noi");
    const [inputText, setInputText] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=df16807c1a8fd4d96d0b9b1c574caa7a&units=metric`
                );
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                const data = await response.json();
                setError(false);
                setData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cityName]);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setCityName(e.target.value);
            setInputText("");
        }
    };

    return (
        <div className="bg_img">
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <TextField
                        variant="filled"
                        label="Tìm Kiếm Địa Điểm"
                        className="input"
                        error={error}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <h1 className="city">{data.name}</h1>
                    <div className="group">
                        <img
                            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt=""
                        />
                        <h1>{data.weather[0].main}</h1>
                    </div>

                    <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

                    <Slide direction="right" timeout={800} in={!loading}>
                        <div className="box_container">
                            <div className="box">
                                <p>Humidity</p>
                                <h1>{data.main.humidity.toFixed()}%</h1>
                            </div>

                            <div className="box">
                                <p>Wind</p>
                                <h1>{data.wind.speed.toFixed()} km/h</h1>
                            </div>

                            <div className="box">
                                <p>Feels Like</p>
                                <h1>{data.main.feels_like.toFixed()} °C</h1>
                            </div>
                        </div>
                    </Slide>
                </>
            )}
        </div>
    );
}

export default App;
