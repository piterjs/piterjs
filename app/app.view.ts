namespace $.$$ {

	$mol_tree

	export class $piterjs_app extends $.$piterjs_app {

		@ $mol_mem
		now( next? : string | null ) { return this.$.$mol_state_arg.value( 'now' , next ) }

		@ $mol_mem
		intro( next? : string | null ) { return this.$.$mol_state_arg.value( 'intro' , next ) }

		@ $mol_mem
		meetup_id( next? : string | null ) { return this.$.$mol_state_arg.value( 'meetup' , next ) }
		meetup( id : string ) { return $piterjs_meetup.item( id ) }
		
		speech_id( next? : string ) { return this.$.$mol_state_arg.value( 'speech' , next ) }
		speech( id : string ) { return $piterjs_speech.item( id ) }
		
		speaker_id( next? : string ) { return this.$.$mol_state_arg.value( 'speaker' , next ) }
		speaker( id : string ) { return $piterjs_speaker.item( id ) }

		@ $mol_mem
		pages() {
			if( this.intro() != null ) return [ this.Intro() ]
			return [
				this.Menu() ,
				... !this.meetup_id() ? [ this.Now() ] : [] ,
				... this.meetup_id() ? [ this.Meetup( this.meetup_id() ) ] : [] ,
				... this.speech_id() ? [ this.Speech( this.speech_id() ) ] : [] ,
			]
		}

		@ $mol_mem
		title() {
			if( this.intro() != null ) return this.Intro().title()
			return this.Book().title()
		}

		@ $mol_mem
		meetups() {
			return this.$.$piterjs_meetup.all().slice()
			.sort( ( a , b )=> b.start().valueOf() - a.start().valueOf() )
		}

		@ $mol_mem
		meetup_current() {
			const id = this.meetup_id()
			const meetup = id ? this.meetup( id ) : this.meetups()[0]
			return meetup
		}

		@ $mol_mem
		place() {
			return this.meetup_current().place()
		}

		@ $mol_mem
		menu_meetups() {
			return this.meetups().map( meetup => this.Menu_meetup( meetup.id() ) )
		}
		menu_meetup( id : string ) { return this.meetup( id ) }
		menu_meetup_id( id : string ) { return id }

		toggle_intro( next? : boolean ) {
			
			if( next !== undefined ) {

				if( this.intro() ) {
					this.intro( null )
				} else {
					this.intro( 'main' )
				}

			}

			return Boolean( this.intro() )

		}

		theme( next? : '$mol_theme_light' | '$mol_theme_dark' | '$mol_theme_auto' ) {
			return this.$.$mol_state_local.value( 'lights' , next )
				?? (
					$mol_dom_context.matchMedia('(prefers-color-scheme: dark)').matches ? '$mol_theme_dark'
					: $mol_dom_context.matchMedia('(prefers-color-scheme: light)').matches ? '$mol_theme_light'
					: '$mol_theme_auto'
				)
		}

		lights( next? : boolean ) {

			let theme = this.theme()
			if( next === undefined ) return theme === '$mol_theme_light'

			this.theme( next ? '$mol_theme_light' : '$mol_theme_dark' )

			return next
		}

	}

}
