function NewReply() {
    return (
        <div className="replynew">
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <div className="replynew__title">Leave a reply</div>
                        <p className="replynew__desc">
                            Want to join the discussion?
                            <br />
                            feel free to contribute
                        </p>
                        <form className="replynew-form">
                            <textarea className="replynew-form__area"></textarea>
                            <label className="replynew-form__label">
                                <input type="text" className="replynew-form__input" required />
                                <span className="replynew-form__title">Name <span>*</span></span>
                            </label>
                            <label className="replynew-form__label">
                                <input type="text" className="replynew-form__input" required />
                                <span className="replynew-form__title">Email <span>*</span> </span>
                            </label>
                            <label className="replynew-box">
                                <input type="checkbox" className="replynew-box__input" />
                                <span className="replynew-box__title">Save my name, email, and website in this browser for the next time I comment
                                </span>
                            </label>
                            <button type="submit" className="replynew-form__submit">Post comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewReply;