import React, {Component} from 'react';
import './texts.css';
import styled from 'styled-components';

const TextsBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

export default class Texts extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onSubmit(e){
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form);
        // console.log(form)
        
        fetch('/data/', {
          method: "POST",
          // headers: {
          //   'X-CSRFToken': object.csrfmiddlewaretoken
          // },
          body: formData
        }).then(data => {
          if (!data.ok){
            throw Error(data.status);
          }
          //console.log('так')
        }).catch((data) => {
          console.log(`Try again! Error: ${Error(data.status)}`)
        }).finally(() => {
          form.reset();
        });
    }

    render() {
        return(
            <form
                onSubmit={this.onSubmit}>
                <input
                type='text'
                placeholder='Audio'
                onChange={this.onValueChange}
                />
                <input
                    type='text'
                    placeholder='Text'
                    onChange={this.onValueChange}
                />
                <button
                    type='submit'
                ></button>
            </form>
        )
        }
}