import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquarePen({ size = 24, ...props }: IconProps) {
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
      <path d="M18.2632 9.6258L15.8319 12.0572C15.7361 12.153 15.6219 12.2283 15.4962 12.2786L11.3714 13.9285C11.2533 13.9757 11.1272 14 11 14C10.4477 14 10 13.5523 10 13C10 12.8728 10.0243 12.7467 10.0715 12.6286L11.7214 8.5038C11.7717 8.3781 11.847 8.2639 11.9428 8.1681L17.3054 2.8055C18.3794 1.7314 20.1206 1.7314 21.1945 2.8054C22.2685 3.8794 22.2685 5.6206 21.1945 6.6945Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3L6 3C4.3431 3 3 4.3431 3 6L3 21L7 17L18 17C19.6569 17 21 15.6569 21 14L21 12M11 13L15.1248 11.3501L20.4874 5.9874C21.1709 5.304 21.1709 4.196 20.4874 3.5126C19.804 2.8291 18.696 2.8291 18.0126 3.5126L12.6499 8.8752Z"/>
    </svg>
  )
}
