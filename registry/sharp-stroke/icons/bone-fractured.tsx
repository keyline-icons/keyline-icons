import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BoneFractured({ size = 24, ...props }: IconProps) {
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
      <path d="M12.1768 8.9948L13.586 7.5856C13.4459 7.493 13.3154 7.3866 13.1966 7.2678C12.2203 6.2915 12.2203 4.7086 13.1966 3.7323C14.173 2.7559 15.7559 2.7559 16.7322 3.7322C17.7085 4.7085 17.7085 6.2915 16.7322 7.2678C17.7085 6.2915 19.2915 6.2915 20.2678 7.2678C21.2441 8.2441 21.2441 9.827 20.2678 10.8033C19.2914 11.7797 17.7085 11.7797 16.7322 10.8034C16.6134 10.6846 16.507 10.5541 16.4144 10.414L15.0052 11.8232L14.2981 9.7019ZM11.8232 15.0052L10.414 16.4144C10.5541 16.507 10.6846 16.6134 10.8034 16.7322C11.7797 17.7085 11.7797 19.2914 10.8034 20.2677C9.827 21.2441 8.2441 21.2441 7.2678 20.2678C6.2915 19.2915 6.2915 17.7085 7.2678 16.7322C6.2915 17.7085 4.7085 17.7085 3.7322 16.7322C2.7559 15.7559 2.7559 14.173 3.7322 13.1967C4.7086 12.2203 6.2915 12.2203 7.2678 13.1966C7.3866 13.3154 7.493 13.4459 7.5856 13.586L8.9948 12.1768L11.1161 12.8839ZM8.5403 8.5403L6.5403 6.5403M15.4597 15.4597L17.4597 17.4597" fill="none"/>
    </svg>
  )
}
