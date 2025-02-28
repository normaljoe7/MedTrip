
import { useState, useRef } from 'react';
import { FileUp, FileText, X, Download, Eye, Trash } from 'lucide-react';
import { MedicalDocument } from '@/types';

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      // Create URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      
      // Format file size
      const fileSizeInKB = file.size / 1024;
      let formattedSize;
      
      if (fileSizeInKB > 1024) {
        formattedSize = `${(fileSizeInKB / 1024).toFixed(2)} MB`;
      } else {
        formattedSize = `${fileSizeInKB.toFixed(2)} KB`;
      }
      
      // Get file extension
      const fileType = file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
      
      const newDocument: MedicalDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: fileType,
        size: formattedSize,
        date: new Date().toLocaleDateString(),
        url: fileUrl
      };
      
      setDocuments(prev => [...prev, newDocument]);
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <section id="documents-section" className="py-20 bg-gray-50">
      <div className="medictrip-container">
        <div className="text-center space-y-4 mb-12">
          <span className="medictrip-badge-primary inline-block">Medical Records</span>
          <h2 className="text-3xl font-bold">Upload Your Documents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Securely upload and manage your medical records and prescriptions for better consultation and treatment planning.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Upload Area */}
          <div
            className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
              isDragging ? 'border-medictrip-500 bg-medictrip-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              multiple
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <div className="text-center">
              <FileUp className="w-12 h-12 text-medictrip-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
              <p className="text-gray-500 text-sm mb-4">
                Upload your medical records, prescriptions, or any other health-related documents.
                <br />
                Supported formats: PDF, JPG, PNG, DOC, DOCX
              </p>
              <button className="medictrip-button-primary">
                Select Files
              </button>
            </div>
          </div>
          
          {/* Document List */}
          {documents.length > 0 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Documents</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Uploaded
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-medictrip-600 mr-3" />
                            <span className="text-sm font-medium text-gray-900 truncate max-w-xs">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="medictrip-badge-secondary">{doc.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-medictrip-600 hover:text-medictrip-800"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </a>
                            <a
                              href={doc.url}
                              download={doc.name}
                              className="text-gray-500 hover:text-gray-700"
                              title="Download"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                            <button
                              onClick={() => removeDocument(doc.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;
