import React, { Component } from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../../assets/img/lf30_editor_jsp8hF.json';

export default class Lotties extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData.default,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const styles = {
            svg: {
                width: 200,
                heigth: 200,
            }
        }

        return (
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true} />
        );
    }
}