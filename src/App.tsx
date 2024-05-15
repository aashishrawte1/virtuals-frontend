import { useEffect, useState } from 'react';
import './App.css';
import axios from './axios-config';


function App() {
  const [recommendations, setRecommendations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [dragging, setDragging] = useState(false);


    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const userProfile = {
                  "name": "Aashish", 
                  "gender": "Male", 
                  "location": "India", 
                  "university": "University B",
                  "interests": "Movies"
              } ;
                const response = await axios.post('/recomendations', userProfile);
                setRecommendations(response.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };
        fetchRecommendations();
        console.log("recommendations", recommendations);
    }, []);

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        setStartX(event.touches[0].clientX);
        setDragging(true);
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        const deltaX = event.changedTouches[0].clientX - startX;

        if (deltaX > 50) {
            handleSwipe('right');
        } else if (deltaX < -50) {
            handleSwipe('left');
        }
        setDragging(false);
    };

    const handleSwipe = (direction: string) => {
        if (direction === 'left') {
            console.log('Swiped left');
            setCurrentIndex(prevIndex => (prevIndex + 1) % recommendations.length);
        } else if (direction === 'right') {
            console.log('Swiped right');
            setCurrentIndex(prevIndex => (prevIndex - 1 + recommendations.length) % recommendations.length);
        }
    };
    // {/* https://picsum.photos/200/300 */}
    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            {recommendations.map((recommendation:any, index:any) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(https://picsum.photos/200/300)`, // Assuming there's an image field in the recommendation data
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: index === currentIndex ? 1 : 0, // Show only the current recommendation
                        transition: 'opacity 0.3s'
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div style={{ position: 'absolute', color: 'black', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                        <h3>{recommendation.name}</h3>
                        <p>{recommendation.location}</p>
                        <p>{recommendation.university}</p>
                        <p>{recommendation.interests}</p>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default App;
