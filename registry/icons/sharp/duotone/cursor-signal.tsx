import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorSignal({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.31442 9.28675C9.58768 9.01798 9.99049 8.92947 10.3515 9.05824L22.3359 13.3327C22.7153 13.4681 22.9762 13.8181 22.998 14.2203C23.0196 14.6224 22.7979 14.9989 22.4355 15.1744L17.6592 17.4879L14.9677 22.4752C14.7788 22.8251 14.4002 23.031 14.0039 22.9977C13.6077 22.9643 13.2685 22.6984 13.1406 22.3219L9.06833 10.3209C8.9452 9.95791 9.04138 9.55579 9.31442 9.28675Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 11V10C6 7.7909 7.7909 6 10 6H11M2 11V10C2 5.5817 5.5817 2 10 2H11"/>
    </svg>
  )
}
