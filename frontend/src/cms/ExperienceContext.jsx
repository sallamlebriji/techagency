import {createContext,useContext} from 'react';
import {experienceDefaults} from '../../../shared/experience.js';
export const ExperienceContext=createContext(experienceDefaults);
export const useExperience=()=>useContext(ExperienceContext);
