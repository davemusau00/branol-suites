import React, { useState } from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle2, HeartHandshake } from 'lucide-react';

export const GoogleReviewSection: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handlePrivateFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !selectedRating) return;

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName || 'Anonymous Guest',
          rating: selectedRating,
          comment,
          contactInfo,
        }),
      });
      setSubmittedFeedback(true);
    } catch (err) {
      console.error(err);
      setSubmittedFeedback(true);
    }
  };

  return (
    <section className="py-16 bg-[#121212] text-white border-t border-[#262626]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
            GUEST FEEDBACK & REVIEWS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            How was your stay at Branol?
          </h2>
          <p className="text-xs text-[#A8A299] max-w-md mx-auto font-light">
            Your real experiences shape Branol. Select a rating below to share your feedback.
          </p>
        </div>

        {/* Interactive Star Selection */}
        {!selectedRating && (
          <div className="flex items-center justify-center gap-3 py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingSelect(star)}
                className="p-3 bg-[#1A1A1A] hover:bg-[#B85228] border border-[#2A2A2A] text-amber-400 hover:text-white transition-colors group"
                aria-label={`Rate ${star} stars`}
              >
                <Star className="w-7 h-7 fill-current" />
              </button>
            ))}
          </div>
        )}

        {/* Flow A: 4 or 5 Stars -> Google Review Redirect */}
        {selectedRating && selectedRating >= 4 && (
          <div className="bg-[#1A1A1A] border border-[#B85228] p-8 max-w-lg mx-auto space-y-4 animate-in fade-in duration-300 text-center">
            <div className="text-amber-400 flex justify-center text-xl">
              {'★'.repeat(selectedRating)}
            </div>
            <h3 className="font-serif text-2xl font-normal text-white">
              Thank you for the warm feedback!
            </h3>
            <p className="text-xs text-[#C5BFB5] leading-relaxed">
              We are delighted you enjoyed your stay in Mwingi. Would you take 30 seconds to support Branol Hotel by posting a Google Review?
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Branol+Hotel+Mwingi"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>LEAVE GOOGLE REVIEW</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedRating(null)}
                className="py-3 px-4 border border-[#333] hover:text-white text-xs text-[#888]"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Flow B: 1 to 3 Stars -> Private Direct Feedback Form */}
        {selectedRating && selectedRating < 4 && !submittedFeedback && (
          <form
            onSubmit={handlePrivateFeedbackSubmit}
            className="bg-[#1A1A1A] border border-[#3A3A3A] p-6 max-w-lg mx-auto space-y-4 animate-in fade-in duration-300 text-left"
          >
            <div className="text-center space-y-1">
              <div className="text-amber-400 flex justify-center text-xl">
                {'★'.repeat(selectedRating)}
              </div>
              <h3 className="font-serif text-xl font-normal text-white">
                We're sorry we fell short.
              </h3>
              <p className="text-xs text-[#A8A299]">
                Please let us know what went wrong so management can address it directly.
              </p>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#888] mb-1">
                Your Feedback / Comments *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe your stay experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2.5 focus:outline-none focus:border-[#B85228]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#888] mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Guest Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2 focus:outline-none focus:border-[#B85228]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#888] mb-1">
                  Phone / Email
                </label>
                <input
                  type="text"
                  placeholder="For follow up"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2 focus:outline-none focus:border-[#B85228]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                SUBMIT PRIVATE FEEDBACK
              </button>
              <button
                type="button"
                onClick={() => setSelectedRating(null)}
                className="py-2.5 px-4 border border-[#333] text-xs text-[#888]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Feedback Submitted Confirmation */}
        {submittedFeedback && (
          <div className="bg-[#1A1A1A] border border-[#3A3A3A] p-6 max-w-lg mx-auto space-y-3 text-center animate-in fade-in">
            <HeartHandshake className="w-8 h-8 text-[#B85228] mx-auto" />
            <h3 className="font-serif text-xl text-white">Thank you for helping us improve.</h3>
            <p className="text-xs text-[#A8A299]">
              Your feedback has been delivered directly to Branol Hotel management.
            </p>
            <button
              onClick={() => {
                setSelectedRating(null);
                setSubmittedFeedback(false);
              }}
              className="text-xs text-[#B85228] underline pt-2 inline-block"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
