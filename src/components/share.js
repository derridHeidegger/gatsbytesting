import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlusG, faLinkedinIn, faRedditSquare, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import {
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	RedditShareButton,
} from 'react-share';


import './share.css'


const Share = ({ socialConfig, tags }) => {
  //console.log('tags from share: ', tags);
  return (
    <div className="post-social">
      <FacebookShareButton url={socialConfig.config.url} className="button is-outlined is-rounded facebook" >
        <span className="icon">
          <FontAwesomeIcon icon={faFacebook} />
        </span>
        <span className="text">Facebook</span>
      </FacebookShareButton>
      <TwitterShareButton url={socialConfig.config.url} className="button is-outlined is-rounded twitter" title={socialConfig.config.title} via={socialConfig.twitterUsername.split('@').join('')} hashtags={tags} >
        <span className="icon">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
        <span className="text">Twitter</span>
      </TwitterShareButton>
      <GooglePlusShareButton url={socialConfig.config.url} className="button is-outlined is-rounded googleplus" >
        <span className="icon">
          <FontAwesomeIcon icon={faGooglePlusG} />
        </span>
        <span className="text">Google+</span>
      </GooglePlusShareButton>
      <LinkedinShareButton url={socialConfig.config.url} className="button is-outlined is-rounded linkedin" title={socialConfig.config.title} >
        <span className="icon">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </span>
        <span className="text">LinkedIn</span>
      </LinkedinShareButton>
      <RedditShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
        <span className="icon">
          <FontAwesomeIcon icon={faRedditSquare} />
        </span>
        <span className="text">Reddit</span>
      </RedditShareButton>
      <WhatsappShareButton url={socialConfig.config.url} className="button is-outlined is-rounded whatsapp" title={socialConfig.config.title} >
        <span className="icon">
          <FontAwesomeIcon icon={faWhatsapp} />
        </span>
        <span className="text">WhatsApp</span>
      </WhatsappShareButton>
    </div>
  )
}

Share.propTypes = {
	socialConfig: PropTypes.shape({
		twitterUsername: PropTypes.string.isRequired,
		config: PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	}).isRequired,
	tags: PropTypes.arrayOf(PropTypes.string),
};
Share.defaultProps = {
	tags: [],
};


export default Share