import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pear({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4.0004C10.2317 4.0004 8.7411 5.3194 8.526 7.0746C8.3891 8.1921 7.879 9.2307 7.0784 10.0223C5.7484 11.3372 5 13.1298 5 15C5 18.8659 8.134 22 12 22C15.866 22 19 18.8659 19 15C19 13.1298 18.2516 11.3372 16.9216 10.0223C16.121 9.2307 15.6109 8.1921 15.474 7.0746C15.4342 6.75005 15.3508 6.44042 15.2302 6.15128M12 4.0004C12.5651 4.0004 13.1018 4.13508 13.5775 4.37564M12 4.0004C12 2.8004 11.8 2 11 2M13.5775 4.37564C14.3154 4.7487 14.9067 5.37639 15.2302 6.15128M13.5775 4.37564C13.4919 4.60509 13.4315 4.84759 13.4 5.1C13.8775 5.65143 14.5245 6.01875 15.2302 6.15128M13.5775 4.37564C14.0357 3.14794 15.2174 2.2939 16.5786 2.2939C17.508 2.2939 18.3916 2.6975 19 3.4001C18.7997 5.0032 17.437 6.2063 15.8214 6.2063C15.6214 6.2063 15.4236 6.18761 15.2302 6.15128"/>
    </svg>
  )
}
