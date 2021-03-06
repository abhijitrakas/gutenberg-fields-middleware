/**
 * Textarea field.
 */

const { TextareaControl, BaseControl } = wp.components;

export default function textareaControl( props, config, attributeKey ) {
	const defaultAttributes = {
		value: props.attributes[ attributeKey ] || '',
	};

	const fieldAttributes = _.extend( defaultAttributes, config );

	fieldAttributes.onChange = ( value ) => {
		if ( config.onChange ) {
			config.onChange( value, props );
		} else {
			const newAttributes = {};
			newAttributes[ attributeKey ] = value;
			props.setAttributes( newAttributes );
		}
	};

	delete fieldAttributes.type;

	return (
		<BaseControl
			id={ fieldAttributes.id }
		>
			<TextareaControl
				{ ...fieldAttributes }
			/>
		</BaseControl>
	);
}
