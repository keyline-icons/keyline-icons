import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lungs({ size = 24, ...props }: IconProps) {
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
      <path d="M9.9755 12.2209L9.0572 20.4855L2.999 22C2.3431 20.7688 2 19.3951 2 18C2 14.5742 4.0547 11.4826 7.2132 10.156C7.4584 10.053 7.7217 10 7.9877 10C9.0923 10 9.9877 10.8954 9.9877 12C9.9877 12.0738 9.9836 12.1475 9.9755 12.2209ZM14.0245 12.2209C14.0164 12.1475 14.0123 12.0738 14.0123 12C14.0123 10.8954 14.9077 10 16.0123 10C16.2783 10 16.5416 10.053 16.7868 10.156C19.9453 11.4826 22 14.5742 22 18C22 19.3951 21.6569 20.7688 21.001 22L14.9428 20.4855L14.0245 12.2209ZM12 1L12 2L12 6M12 6L9.0995 10.3375M12 6L14.9005 10.3375M9.7778 14C8.7315 14.1548 7.7785 14.6886 7.1 15.5L6.8002 15.8585M14.2222 14C15.2685 14.1548 16.2215 14.6886 16.9 15.5L17.1998 15.8585" fill="none"/>
    </svg>
  )
}
