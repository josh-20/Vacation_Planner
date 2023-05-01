import style from "../styles/contact.module.css"
export default function Contact(){
    return(<>
            <div className={"text-center " + style.contactColor}>
                <h4 className={style.firstContact}>Ryan Gubler (XXX)XXX-XXXX</h4>
                <h4>Joshua Hamby (XXX)XXX-XXXX</h4>
                <h4>Geoffrey Haselden (XXX)XXX-XXXX</h4>
                <h4 className={style.lastContact}>Braeden Grant (XXX)XXX-XXXX</h4>
            </div>
        </>
    )
}