
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControlLabel, Radio, RadioGroup, Button, TextField} from '@material-ui/core';
import { Firestore } from 'services/firebase';
import withRoot from 'withRoot';
import Dropdown from 'components/Dropdown';
import { isUrlValid } from 'utils/validations';

const firestore = new Firestore();

const styles = theme => ({
    root: {
      width: '100%'      
    },
    formControlType: {      
      display: 'flex',
      width: '100%',      
      flexWrap: 'nowrap',
      marginBottom: 10,
      justifyContent: 'center'
    },
    formControlField: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
      width: '30%',
      display: 'flex',      
      flexDirection: 'row'
    },    
    textField: {      
      width: 400,
      marginBottom: 10      
    }
  });



  // function isUrlValid(userInput) {
  //   var res = userInput.match(/(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g);
  //   if(res == null)
  //       return false;
  //   else
  //       return true;
  // }

  class PayloadForm extends React.Component {
    isValidPayload = false

    state = {
      type: 'video',
      videoCategories:[],
      videoLinks:[],
      selectedVideoLink: {show: false, value: ''},      
      titleValue:'',
      bodyValue:'',
      imageValue:'',
      videoCategoryValue: '',
      videoIdValue: '',
      webUrlValue:'',
      updatedByValidityCheck: false      
    }

    textFields = {
                  'video' : [
                              {uiName: 'Title', backEndName: 'title', fillAfter: '', inputType: 'text'}, 
                              {uiName: 'Body', backEndName: 'body', fillAfter: 'title', inputType: 'text'},
                              {uiName: 'Image Url', backEndName: 'image', fillAfter: 'body', inputType: 'text'},
                              {uiName: 'Video Category', backEndName: 'videoCategory', fillAfter: 'image', inputType: 'dropdown', dataKey: 'videoCategories'},
                              {uiName: 'Video Link', backEndName: 'videoId', fillAfter: 'videoCategory', inputType: 'dropdown', dataKey: 'videoLinks'}
                            ],
                  'url'   : [ 
                              {uiName: 'Title', backEndName: 'title', fillAfter: '', inputType: 'text'}, 
                              {uiName: 'Body', backEndName: 'body', fillAfter: 'title', inputType: 'text'},
                              {uiName: 'Web Url', backEndName: 'webUrl', fillAfter: 'body', inputType: 'text'}
                            ]
                }

    async componentDidMount() {
      try {
        // get homelayout document from firestore
        const homeLayoutDocument = await firestore.getOne('layouts', 'home');
        // extract the categories from the document
        const { categories } = homeLayoutDocument;
        
        this.categories = categories;
        const categoriesArr = categories.map(cat => cat.name);
                                        
        // storing home screen data to ensure it's available later
        this.setState({videoCategories: categoriesArr});
      } catch (Error) {
        // console.error('An error occurred while getting home screen categories');
        // console.error('Error is ', Error);
        console.log({Error})
      }
    }              
    componentDidUpdate() {
      
      const { type, videoCategoryValue, videoIdValue } = this.state;
      const isValidVideoCategoryValue = (videoCategoryValue !== '') && (videoCategoryValue !== 'Select');
      const isValidVideoIdValue = (videoIdValue !== '') && (videoIdValue !== 'Select');

      if (!this.state.updatedByValidityCheck) {

        if (this.state.titleValue.length === 0) {
          return this.setState({
            bodyValue:'',
            imageValue:'',
            videoCategoryValue: '',
            videoIdValue: '',
            ...(type === 'url' ? {webUrlValue: ''} : {}),
            updatedByValidityCheck: true
          })
        };
        if (this.state.bodyValue.length === 0) {
          return this.setState({          
            imageValue:'',
            videoCategoryValue: '',
            videoIdValue: '',
            ...(type === 'url' ? {webUrlValue: ''} : {}),
            updatedByValidityCheck: true
          })
        }
        if (this.state.imageValue.length === 0 && type === 'video') {
          return this.setState({                    
            videoCategoryValue: '',
            videoIdValue: '',            
            updatedByValidityCheck: true
          })
        }
        if (!isValidVideoCategoryValue  && type === 'video') {
          return this.setState({                              
            videoIdValue: '',
            updatedByValidityCheck: true
          })
        }
      }
      
      if (type === 'video') {
        const areUrlsValid = isUrlValid(this.state.imageValue);
        // console.log({areUrlsValid});
        // const isVideoInCategory = this.categories
        if ( 
              this.state.titleValue.length > 0 && 
              this.state.bodyValue.length > 0 &&
              this.state.imageValue.length > 0 &&
              isValidVideoCategoryValue && 
              isValidVideoIdValue  && 
              areUrlsValid ) {
                !this.isValidPayload && this.props.validity(true);
                this.isValidPayload = true;                
          }        
        else {
          this.isValidPayload && this.props.validity(false);
          this.isValidPayload = false;
        }
      }

      if (type === 'url') {
        const isWebUrlValid = isUrlValid(this.state.webUrlValue);
        if ( 
          this.state.titleValue.length > 0 && 
          this.state.bodyValue.length > 0 &&
          this.state.webUrlValue.length > 0 && isWebUrlValid
           ) {
            !this.isValidPayload &&  this.props.validity(true);
            this.isValidPayload = true;
        }        
        else {          
          this.isValidPayload && this.props.validity(false);
          this.isValidPayload = false;
        }
      }
    }

    handleTypeChange = ({target: {value}}) => {
      this.props.handleInput('type', value);
      this.setState(prevState => ({
                ...prevState, 
                type: value, 
                updatedByValidityCheck: false,
                selectedVideoLink:{show:false, value:''},
                titleValue:'',
                bodyValue:'',
                imageValue:'',
                videoCategoryValue: '',
                videoIdValue: '',
                webUrlValue:'',                
      }));
    }

    handleInput = name => ({target: {value}}) => {
      this.props.handleInput(name, value);      
      this.setState({ [`${name}Value`]: value, updatedByValidityCheck: false })      
    }

    handleSelection = type => selection => {
      // console.log({selection});
      if (selection && selection !== 'Select') {
        (type === 'videoCategory') && this.getVideos(selection);
        // console.log({selection});
        const reducedSelection = (type === 'videoId') 
                                  ? this.videoEntries[selection].id 
                                  : selection;
        this.props.handleInput(type, reducedSelection);
        this.setState(prevState => ({...prevState,
                [`${type}Value`]: reducedSelection, 
                updatedByValidityCheck: false,
                ...(type === 'videoCategory' ?  {selectedVideoLink:{show: false, value: ''}, videoIdValue:''} : {}),
                ...(type === 'videoId' ? {selectedVideoLink:{show: true, value: reducedSelection}} : {}),                
              }))
      }

      //edge case: category deselected after video link is selected
      if (type === 'videoCategory' && !selection) {
        this.setState(prevState => ({
          ...prevState, 
          selectedVideoLink:{show: false, value: ''},
          videoCategoryValue: '',
          videoIdValue: ''
        }))
      }
    }

    getVideos = async (category) => {     
      
      try {
        // creating the filter to get videos        
        const metadataFilter = [];        
        if (category && category !== 'any') {
          const categories = category
            .split(',')
            .map((value) => value.toLowerCase());
          metadataFilter.push(...categories);
        }
  
        const videoEntries = await firestore.getMany('videos', {
          metadata: {
            op: 'array-contains',
            value: metadataFilter.join('_')
          }
        });
  
        if (Object.keys(videoEntries).length === 0) {
          throw new Error('unable to retrieve videos');
        }
        this.videoEntries = videoEntries;
        this.setState({videoLinks : Object.keys(videoEntries)});
        
      } catch (error) {
        console.log({error})
      }
    };

    renderTextField = textFieldObj =>  {
      const { backEndName, uiName, fillAfter, inputType } = textFieldObj;
      const shouldBeDisabled = Boolean(fillAfter) && !this.state[`${fillAfter}Value`].length;
      // console.log(`value in ${backEndName} field is: `, this.state[`${backEndName}Value`])
      // const preserveValue = !fillAfter || this.state[`${fillAfter}Value`];
      return (
        <div className={this.props.classes.formControlField} key={backEndName}>          
          
          {inputType === 'text' && (
            <TextField 
              required
              variant='outlined'
              id={backEndName}
              label={uiName} 
              disabled={shouldBeDisabled} 
              className={this.props.classes.textField} 
              value={ this.state[`${backEndName}Value`]} onChange={this.handleInput(backEndName)}/>
         
          )}
          {
            inputType === 'dropdown' && (
                <Dropdown 
                  menuList={this.state[textFieldObj.dataKey]} 
                  handleSelection={this.handleSelection(backEndName)}
                  disabled={shouldBeDisabled}
                  deselect={backEndName === 'videoId' ? !this.state[`${backEndName}Value`]: false}
                  prompt={uiName}                   
                  />
            )
          }
        </div>
      )
    }
    

    render() {
        
        const { classes } = this.props;
        const { type } = this.state;

        return (
            <div className={classes.root}>
              <div className={classes.formControlType} >                           
                <RadioGroup
                    aria-label="type"
                    name="video"
                    className={classes.group}
                    value={type}
                    onChange={this.handleTypeChange}
                    
                >
                    <FormControlLabel value="video" control={<Radio />} label="Video" />
                    <FormControlLabel value="url" control={<Radio />} label="Url" />                    
                </RadioGroup>              
              </div>
              { this.textFields[type].map(this.renderTextField) }
              {this.state.selectedVideoLink.show && <Button variant="contained" href={this.state.selectedVideoLink.value} target="_blank" className={classes.button}>
                  Video Link
                  </Button> }
            </div>
        )
    }
  }

  export default withRoot(withStyles(styles)(PayloadForm));