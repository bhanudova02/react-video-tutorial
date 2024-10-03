export function HomeComponent() {
    const cardData = [
        { title: 'Learn at Your Own Pace', dec: 'Access our comprehensive library of React tutorials anytime, anywhere.', img: '/home_card_one.jpeg' },
        { title: 'Expert Instructors', dec: 'Learn from industry professionals with years of React experience.', img: '/home_card_two.jpeg' },
        { title: 'Interactive Exercises', dec: 'Reinforce your learning with hands-on coding exercises and projects.', img: '/home_card_three.jpeg' },
        { title: 'Community Support', dec: 'Join a supportive community of learners and developers to discuss and resolve issues.', img: '/home_card_four.jpg' },
    ]

    return (
        <div className="p-4 bg-light">
            <h2 className="text-center mt-3">Welcome To React Video Tutorial Home</h2>
            <div className="w-75 mx-auto">
                <div className="row">
                    {cardData.map(card =>
                        <div key={card.title} className="col-6 mt-4">
                            <div key={card.title} className="card w-100" >
                                <img className="card-img-top" src={card.img} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.dec}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
