/**
 * Image Field.
 */

const { MediaUpload } = wp.blocks;
const { Button } = wp.components;
const { __ } = wp.i18n;

import imagePlaceholder from '../components/image-placeholder';

export default function imageUpload( props, config, attributeKey ) {
	const buttonText = config.buttonText ? config.buttonText : __( 'Open Media Library' );
	const image = props.attributes[ attributeKey ];

	const defaultAttributes = {

		type: 'image',

		value: image || '',

		render( { open } ) {
			const nodes = [];

			if ( ! image ) {
				if ( config.imagePlaceholder ) {
					nodes.push( imagePlaceholder( props, config, attributeKey ) );
				} else {
					nodes.push( (
						<Button className="button button-large button-upload" onClick={ open }>
							{ buttonText }
						</Button>
					) );
				}
			} else {
				nodes.push( (
					<img className="uploaded-image" src={ image.url } alt={ image.alt } />
				) );

				if ( !! config.removeButtonText ) {
					nodes.push( (
						<Button className="button button-large button-remove" onClick={ () => {
							const newAttributes = {};
							newAttributes[ attributeKey ] = '';
							props.setAttributes( newAttributes );
						} }>
							{ config.removeButtonText }
						</Button>
					) );
				}
			}

			return (
				<div className={ 'blocks-' + config.type + '-upload' }>
					{ nodes }
				</div>
			);
		},
	};

	const fieldAttributes = _.extend( defaultAttributes, config );

	fieldAttributes.onSelect = ( media ) => {
		if ( config.onSelect ) {
			config.onSelect( media, props );
		} else {
			const newAttributes = {};
			newAttributes[ attributeKey ] = media;
			props.setAttributes( newAttributes );
		}
	};

	delete fieldAttributes.buttonText;
	delete fieldAttributes.imagePlaceholder;
	delete fieldAttributes.removeButtonText;

	return (
		<MediaUpload
			{ ...fieldAttributes }
		/>
	);
}
