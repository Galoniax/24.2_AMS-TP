import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../config/FirebaseConfig';

class FirebaseService {
  private storage = getStorage(app);
  private BOOKS_KEY: string = 'Books';

  private generateUUID(): string {
    return 'xxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private async uploadImage(bucket: string, file: File): Promise<string> {
    const fileRef = ref(
      this.storage,
      `${bucket}/${this.generateUUID()}_${file.name}`,
    );
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  public async saveImageBook(file: File): Promise<string> {
    return await this.uploadImage(this.BOOKS_KEY, file);
  }
}

export default new FirebaseService();
