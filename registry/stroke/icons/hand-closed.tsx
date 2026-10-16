import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandClosed({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.8958 7.2985L9.8958 5.7317C9.8958 4.7753 10.6647 4 11.6131 4C12.5615 4 13.3303 4.7753 13.3303 5.7317L13.3303 7.2985M13.3303 7.4634L13.3303 6.6762C13.3303 5.7199 14.0991 4.9445 15.0475 4.9445C15.9959 4.9445 16.7648 5.7199 16.7648 6.6762L16.7648 8.093M7.0858 11.8712L6.6116 6.8501C6.5285 5.9704 7.1661 5.1883 8.0381 5.1004C8.8978 5.0137 9.6691 5.6342 9.7763 6.4988L9.8958 7.4634M16.7648 7.4633C16.9409 7.0193 17.5343 6.3348 18.6207 6.5925C19.052 6.6948 19.3651 7.0557 19.497 7.4823C20.277 10.005 20.5255 15.0056 17.3892 18.1682C15.1118 20.4648 6.7736 21.9464 4.2758 14.0752C4.0677 13.3405 3.7763 11.6194 4.2758 10.6118C4.9003 9.3524 6.1492 9.6673 6.7736 10.297" fill="none"/>
    </svg>
  )
}
