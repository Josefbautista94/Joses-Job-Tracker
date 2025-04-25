import mongoose from 'mongoose';
import dotenv from 'dontenv';
import fs from 'fs'; // Node.js module to read files from the file system (used to load sample JSON data)
import path from 'path'; // Node.js module to handle and normalize file paths across different operating systems
import User from './models/User.js';
import Company from './models/Company.js';
import Application from './models/Application.js';
