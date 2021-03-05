import React from "react";
import "./bug.css";
import {StoreContext, UserContext} from "../../App";
import Store from "../../store/store";

export function getRandomCoordinates(brainRectangle: DOMRect): {randomX: number, randomY: number} {
    const bugSize = 50;
    const randomX = bugSize + brainRectangle.x + Math.random() * (brainRectangle.width - 2 * bugSize)
    const randomY = bugSize + brainRectangle.y + Math.random() * (brainRectangle.height - 2 * bugSize)

    return {randomX, randomY}
}

const Bug = () => {

    const store = React.useContext(StoreContext) as Store;
    const {addBug, user, setUser} = React.useContext(UserContext);

    function onBugDisappear() {
        if (user) {
            addBug()
            store.addBug(user)

            const brainBg = document.querySelector(".bugsArea")
            const brainRectangle = brainBg!.getBoundingClientRect()
            const {randomX, randomY} = getRandomCoordinates(brainRectangle)

            const bug = document.getElementsByClassName("bug")[0] as HTMLElement
            bug.style.left = `${randomX}px`
            bug.style.top = `${randomY}px`
            bug.style.transform = `rotate(${Math.random()*360}deg)`
        }
    }

    return (
        <div
            className="bug"
            id="bug"
            onClick={user && onBugDisappear}>
        </div>
    )
}

export default Bug;