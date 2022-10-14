import TranslationsJson from '../translations.json';

export const translate = (text, lang) => {
    return TranslationsJson[text] ? TranslationsJson[text][lang] : '';
}

export const setUpIntersectionObserver = (animateFunction, targetSection) => {
    //Setup IntersectionObserver for animating sections while scrolling
    //Anyways to support browser compatibility we need to make sure that the API exists in the browser
    //If not we just animate the section instantly!
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateFunction(entry.target);
            observer.unobserve(entry.target);
        }), {threshold: .7})

        observer.observe(targetSection);
    }
    else animateFunction(targetSection)
}



//methods for forms validations

const validateElement = element => {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

const invalidateElement = element => {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

export const validateRequired = target => {
    if (!target.value) {
        invalidateElement(target);
        return 'required';
    }
    else{
        validateElement(target);
    }
}

export const validateEmail = target => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+(\w){2,4}$/;

    if (!target.value){
        invalidateElement(target);
        return 'required'
    }
    else {
        if (target.value.match(emailRegex)){
            validateElement(target);
        }
        else{
            invalidateElement(target);
            return 'invalidEmail';
        }
    }
}

export const validatePassword = (target, conPwTarget) => {

    if (target.value.length < 8 || target.value.length > 20){
        invalidateElement(target);
        return {name: 'password', type: 'invalidPassword'}
    }
    else{
        validateElement(target);
    }
    
    if (target.value){
        if (target.value !== conPwTarget.value){
            invalidateElement(conPwTarget);
            return {name: 'conPw', type: 'passwordMisMatch'}
        }
        else{
            validateElement(conPwTarget);
        }
    }
}

export const validateConPw = (target, pwTarget) => {
    if (target.value !== pwTarget.value) {
        invalidateElement(target);
        return 'passwordMisMatch'
    }
    else{
        validateElement(target);
    }
}

export const validateFBLink = target => {
    const regex = /^(https:\/\/)?(www.)?(facebook.com)\/((profile.php\?id=[\d]+)|([\w]+((\.|-)[\w]+)*))(\/)?$/
    if (target.value) {
        if (target.value.match(regex)) validateElement(target);
        else {
            invalidateElement(target);
            return 'enterValidLink';
        }
    }
    else validateElement(target);
}

export const validateInstaLink = target => {
    const regex = /^(https:\/\/)?(www.)?(instagram.com)\/([\w]+(\.[\w]+)*)(\/)?$/
    if (target.value) {
        if (target.value.match(regex)) validateElement(target);
        else {
            invalidateElement(target);
            return 'enterValidLink';
        }
    }
    else validateElement(target);
}

export const validateTwitterLink = target => {
    const regex = /^(https:\/\/)?(www.)?(twitter.com)\/[\w]+(\/)?$/
    if (target.value) {
        if (target.value.match(regex)) validateElement(target);
        else {
            invalidateElement(target);
            return 'enterValidLink';
        }
    }
    else validateElement(target);
}

export const normalizeNumber = number => {
    let normalized = number / (1000 * 1000);
    if (normalized < 1) normalized *= 1000;
    else return `${normalized - Math.floor(normalized) <= 0.1 ? Math.floor(normalized) : normalized.toFixed(1)}M`;
    if (normalized < 1) normalized *= 1000;
    else return `${normalized - Math.floor(normalized) <= 0.1 ? Math.floor(normalized) : normalized.toFixed(1)}K`;
    return `${normalized.toFixed(0)}`;
}

export const isArabic = string => {
    const arabic = /[\u0600-\u06FF]/
    return arabic.test(string);
}

export const validateImgs = files => {
    if (files.length !== 1) {
        return 'multipleFilesDenied';
    }
    let file = files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.indexOf(file.type) === -1) {
        return 'unsupportedType';
    }
    if ((file.size / 1024 / 1024) > 2) {
        return 'largeFile';
    }
}