import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let registered = false;

export const registerGSAPPlugins = () => {
    if (!registered) {
        gsap.registerPlugin(ScrollTrigger);
        registered = true;
    }
};

export default gsap;
