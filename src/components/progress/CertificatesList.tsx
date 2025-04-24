
import { Award } from "lucide-react";

interface Certificate {
  id: number;
  course: string;
  date: string;
  instructor: string;
}

interface CertificatesListProps {
  certificates: Certificate[];
}

export function CertificatesList({ certificates }: CertificatesListProps) {
  return (
    <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
      <h3 className="font-medium mb-6">Your Certificates</h3>
      
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="border border-white/10 rounded-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 flex flex-col justify-end">
                <Award size={36} className="text-primary mb-3" />
                <h4 className="text-xl font-semibold">{cert.course}</h4>
                <p className="text-sm text-muted-foreground">Certificate of Completion</p>
              </div>
              <div className="p-4 bg-secondary/30">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Issued on</p>
                  <p className="text-sm">{cert.date}</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="text-sm">{cert.instructor}</p>
                </div>
                <button className="w-full mt-4 p-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors text-sm">
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/30 rounded-lg">
          <Award size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-xl font-medium mb-2">No certificates yet</h4>
          <p className="text-muted-foreground mb-6">Complete a course to earn your first certificate</p>
          <button className="px-6 py-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors">
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
}
