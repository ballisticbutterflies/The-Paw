from flask import Blueprint, request, render_template, redirect
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.utils.aws import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    print("FORRRM", form.data["image"])
    if form.validate_on_submit():
          
        image = form.data["image"]
        
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return render_template("post_form.html", form=form, errors=[upload])
            # return{"message": "return line 28"}

        url = upload["url"]
        new_image = Image(
            image= url,
            uploader_id = 1,
            imageable_id = 1,
            imageable_type = 'business')
        db.session.add(new_image)
        db.session.commit()
        return redirect("/businesses")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)
        # return {"message": "return line 38"}

    return render_template("post_form.html", form=form, errors=None)
    # return {"message": "return line 40"}
