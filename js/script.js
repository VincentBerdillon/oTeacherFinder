const app = {

  state: {
    languages: ['PHP', 'JavaScript'],
    specialities: ['React', 'Symfony', 'Data'],
    teachers: [{
        name: 'Benjamin B.',
        language: 'PHP',
        specialty: 'Symfony',
      },
      {
        name: 'Benjamin N.',
        language: 'JavaScript',
        specialty: 'Data',
      },
      {
        name: 'Benoit',
        language: 'JavaScript',
        specialty: 'Data',
      },
      {
        name: 'Cécile',
        language: 'PHP',
        specialty: 'React',
      },
      {
        name: 'Fabien',
        language: 'JavaScript',
        specialty: 'React',
      },
      {
        name: 'Jean-Baptiste',
        language: 'PHP',
        specialty: 'Symfony',
      },
      {
        name: 'Jean-Christophe',
        language: 'PHP',
        specialty: 'Symfony',
      },
      {
        name: 'Luko',
        language: 'JavaScript',
        specialty: 'React',
      },
      {
        name: 'Quentin',
        language: 'JavaScript',
        specialty: 'React',
      },
      {
        name: 'Solène',
        language: 'PHP',
        specialty: 'React',
      },
      {
        name: 'Yann',
        language: 'JavaScript',
        specialty: 'Data',
      },
    ],
    selectedLanguage: 'JavaScript',
    selectedSpecialty: 'React',
  },

  init() {
    app.createFinder();
  },

  createFinder() {
    app.rootElm = document.getElementById("app"); // app. permet de récupére l'élément dans les autres fonctions

    const teachersFiltered = app.state.teachers.filter((teacher) => {
      if (teacher.language !== app.state.selectedLanguage) {
        return false
      }
      if (teacher.specialty !== app.state.selectedSpecialty) {
        return false
      }
      return true
    })

    app.formElm = app.createForm();
    app.counterElm = app.createCounter(teachersFiltered.length);
    app.listElm = app.createList(teachersFiltered);

    app.rootElm.append(app.formElm, app.counterElm, app.listElm);
  },

  createForm() {

    const optLanguageElms = app.state.languages.map((language) => app.configureElement('option', {
      value: language,
      textContent: language,
      selected: language === app.state.selectedLanguage,
    }));

    const selectLanguageElm = app.configureElement('select', {
        classeName: 'form__select',
      },
      optLanguageElms);

    selectLanguageElm.addEventListener('change', app.handleChangeSelectedLanguage)


    const optSpecialtyElms = app.state.specialities.map((specialty) => app.configureElement('option', {
      value: specialty,
      textContent: specialty,
      selected: specialty === app.state.selectedSpecialty,
    }));

    const selectSpecialtyElm = app.configureElement('select', {
        classeName: 'form__select',
      },
      optSpecialtyElms);

    selectSpecialtyElm.addEventListener('change', app.handleChangeSelectedSpecialty)


    const formElm = app.configureElement('form', {
        classeName: 'form',
      },
      [selectLanguageElm, selectSpecialtyElm]);

    return formElm;
  },

  createCounter(nbOfTrainers) {

    const text = app.getCounterTitle(nbOfTrainers);

    const counterElm = app.configureElement('h2', {
      classeName: 'counter'
    }, [text]) // ou [app.getCounterTitle(nbOfTrainers);]
    return counterElm;
  },

  getCounterTitle(number) {
    if (number === 0) {
      return 'aucun formateur trouvé';
    }
    if (number != 0) {
      return `${number} formateurs trouvés`
    }
  },

  createList(teachers) {

    const createTeacherElm = (teacher) => {
      const nameElm = app.configureElement('span', {
        textContent: teacher.name
      })
      const languageElm = app.configureElement('span', {
        className: 'list__item-tag language',
        textContent: teacher.language
      })
      const specialtyElm = app.configureElement('span', {
        className: 'list__item-tag specialty',
        textContent: teacher.specialty
      })
      return app.configureElement('li', {
        className: 'list__item',
      }, [nameElm, languageElm, specialtyElm])
    }

    const teacherElms = teachers.map(createTeacherElm)

    const listElm = app.configureElement('ul', {
      classeName: 'list',
    }, teacherElms)

    return listElm
  },

  handleChangeSelectedLanguage(event) {
    const selectedLanguage = event.target.value;
    app.setState({
      selectedLanguage
    })
  },

  handleChangeSelectedSpecialty(event) {
    const selectedSpecialty = event.target.value;
    app.setState({
      selectedSpecialty
    })
  },

  /**
   * js doc
   * Méthode permettant de créer / configurer un élément HTML
   * @param {string} tag la balise de l'élément à créer
   * @param {object} props la liste des propriétés de l'élément
   * @param {array} children la liste des enfants de l'élément
   * @returns {HTMLElement} l'élément créé 
   */

  configureElement(tag, props = {}, children = []) {
    const elm = document.createElement(tag);
    Object.assign(elm, props); //je passe toutes les propriétés du paramètre props à ma variable elm
    if (children.length > 0) {
      elm.append(...children); //rest operator pour mettre tous les éléments du tableau, d'où append qui peut prendre plusieurs paramètres
    }
    return elm;
  },

  setState(newState) {
    Object.assign(app.state, newState);

    app.rootElm.textContent = '';
    app.createFinder();
  },

};

// on initialise l'app dès que le document est prêt
document.addEventListener('DOMContentLoaded', app.init);